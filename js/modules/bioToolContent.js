const toolContentCache = new Map();
let toolFactoriesModulePromise = null;

function loadToolFactoriesModule() {
  if (!toolFactoriesModulePromise) {
    toolFactoriesModulePromise = import("./toolContentFactories.js");
  }
  return toolFactoriesModulePromise;
}

export async function getBioToolContent(toolType) {
  if (!toolType) return "";

  if (!toolContentCache.has(toolType)) {
    const contentPromise = loadToolFactoriesModule()
      .then((module) => module.getBioToolContent(toolType))
      .then((content) => content || "")
      .catch((error) => {
        toolContentCache.delete(toolType);
        throw error;
      });

    toolContentCache.set(toolType, contentPromise);
  }

  return toolContentCache.get(toolType);
}

export function invalidateBioToolContentCache() {
  toolContentCache.clear();
}
