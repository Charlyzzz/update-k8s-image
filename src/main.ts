import { updateImage } from "./update-image";
import core from "@actions/core";
import * as fs from "fs";

function inputs(): string[] {
  return ["manifest-path", "new-image-tag", "container-name"].map((inputName) =>
    core.getInput(inputName, { required: true })
  );
}

try {
  const [manifestPath, newTag, containerName] = inputs();
  const { manifest, oldTag } = updateImage(
    fs.readFileSync(manifestPath, "utf-8"),
    containerName,
    newTag
  );
  fs.writeFileSync(manifestPath, manifest);
  core.setOutput("old-image-tag", oldTag);
} catch (error) {
  core.setFailed(error.message);
}
