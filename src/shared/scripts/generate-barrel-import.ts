import { readdir, unlink, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

interface BarrelConfig {
  rootDir: string;
  targetLayers: string[];
  ignoredDirectories: Set<string>;
  ignoredFiles: Set<string>;
  extensions: Set<string>;
}

const config: BarrelConfig = {
  rootDir: join(process.cwd(), "src"),

  targetLayers: ["domains", "assemblers", "shared"],

  ignoredDirectories: new Set(["node_modules", ".next", ".git", "__tests__", "__mocks__"]),

  ignoredFiles: new Set(["index.ts", "index.tsx"]),

  extensions: new Set([".ts", ".tsx"])
};

const isIgnoredFile = (fileName: string): boolean => {
  if (config.ignoredFiles.has(fileName)) {
    return true;
  }

  return [".test.ts", ".test.tsx", ".spec.ts", ".spec.tsx", ".stories.ts", ".stories.tsx", ".d.ts"].some(
    (suffix) => fileName.endsWith(suffix)
  );
};

const removeExtension = (fileName: string): string => {
  const extension = extname(fileName);

  return fileName.slice(0, -extension.length);
};

const removeNestedIndexes = async (directoryPath: string, sliceRootPath: string): Promise<void> => {
  const entries = await readdir(directoryPath, {
    withFileTypes: true
  });

  for (const entry of entries) {
    const entryPath = join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (config.ignoredDirectories.has(entry.name)) {
        continue;
      }

      await removeNestedIndexes(entryPath, sliceRootPath);

      continue;
    }

    if (directoryPath !== sliceRootPath && (entry.name === "index.ts" || entry.name === "index.tsx")) {
      await unlink(entryPath);

      console.log(`✗ ${relative(process.cwd(), entryPath)}`);
    }
  }
};

const collectExports = async (directoryPath: string, sliceRootPath: string): Promise<string[]> => {
  const entries = await readdir(directoryPath, {
    withFileTypes: true
  });

  const exports: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (config.ignoredDirectories.has(entry.name)) {
        continue;
      }

      const childExports = await collectExports(join(directoryPath, entry.name), sliceRootPath);

      exports.push(...childExports);

      continue;
    }

    if (isIgnoredFile(entry.name)) {
      continue;
    }

    const extension = extname(entry.name);

    if (!config.extensions.has(extension)) {
      continue;
    }

    const absoluteFilePath = join(directoryPath, entry.name);

    const relativeFilePath = relative(sliceRootPath, absoluteFilePath).replaceAll("\\", "/");

    const importPath = removeExtension(relativeFilePath);

    exports.push(`export * from "./${importPath}";`);
  }

  return exports;
};

const generateSliceBarrel = async (slicePath: string): Promise<void> => {
  await removeNestedIndexes(slicePath, slicePath);

  const exports = await collectExports(slicePath, slicePath);

  if (exports.length === 0) {
    return;
  }

  exports.sort((a, b) => a.localeCompare(b));

  const indexPath = join(slicePath, "index.ts");

  await writeFile(indexPath, `${exports.join("\n")}\n`, "utf8");

  console.log(`✓ ${relative(process.cwd(), indexPath)}`);
};

const generateLayerBarrels = async (layerName: string): Promise<void> => {
  const layerPath = join(config.rootDir, layerName);

  let entries;

  try {
    entries = await readdir(layerPath, {
      withFileTypes: true
    });
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (config.ignoredDirectories.has(entry.name)) {
      continue;
    }

    await generateSliceBarrel(join(layerPath, entry.name));
  }
};

const main = async (): Promise<void> => {
  console.log("Generating barrel files...\n");

  for (const layer of config.targetLayers) {
    await generateLayerBarrels(layer);
  }

  console.log("\nDone.");
};

await main();
