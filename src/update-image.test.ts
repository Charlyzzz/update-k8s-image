import { updateImage } from "./update-image";

test("empty manifest errors", () => {
  expect(() => updateImage("", "", "")).toThrow(
    "Containers definition is missing"
  );
});

test("malformed definition errors", () => {
  const malformedFile = `
spec:
  template2:
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
`;

  expect(() => updateImage(malformedFile, "", "")).toThrow(
    "Containers definition is missing"
  );
});

test("errors when multiple images match name ", () => {
  const multipleMatch = `
spec:
  template:
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
        - name: nginx
          image: nginx:1.14.2
`;

  expect(() => updateImage(multipleMatch, "nginx", "")).toThrow(
    'Expected 1 image with name "nginx" but found 2'
  );
});

function nginxSpec(version: string): string {
  return `spec:
  template:
    spec:
      containers:
        - name: nginx
          image: nginx:${version}
        - name: sidecar
          image: istio:1.0
`;
}

test("updates image version", () => {
  const manifest = nginxSpec("1.0");
  expect(updateImage(manifest, "nginx", "2.0").manifest).toEqual(
    nginxSpec("2.0")
  );
});

test("returns previous tag", () => {
  const manifest = nginxSpec("1.0");
  expect(updateImage(manifest, "nginx", "2.0").oldTag).toEqual("1.0");
});
