import * as jsyaml from "js-yaml";

interface UpdateResult {
  manifest: string;
  oldTag: string;
}

function findContainer(manifest, containerName: string) {
  const images = manifest?.spec?.template?.spec?.containers;
  if (images === undefined) {
    throw new Error("Containers definition is missing");
  }
  if (images === [] || !Array.isArray(images)) {
    throw new Error("Incorrect container definition");
  }
  const matches = images.filter(
    (imageSpec) => imageSpec.name === containerName
  );
  if (matches.length !== 1) {
    throw new Error(
      `Expected 1 image with name "${containerName}" but found ${matches.length}`
    );
  }
  return matches[0];
}

export function updateImage(
  manifestContent: string,
  containerName: string,
  newTag: string
): UpdateResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const manifest = jsyaml.load(manifestContent) as any;
  const targetContainer = findContainer(manifest, containerName);
  const [imageName, oldTag] = targetContainer.image.split(":");
  targetContainer.image = [imageName, newTag].join(":");
  return { manifest: jsyaml.dump(manifest), oldTag };
}
