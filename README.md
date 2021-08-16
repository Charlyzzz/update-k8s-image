# update-k8s-image action

This action updates a container image tag in a Kubernetes deployment file.

# Usage

<!-- start usage -->

```yaml
- id: update-image
  uses: Charlyzzz/update-k8s-image
  with:
    manifest-path: path/to/deployment.yaml
    new-image-tag: latest
    container-name: my-backend

# Example of using the output
- id: test
  run: curl ${{ steps.update-image.outputs.old-image-tag }}
```

<!-- end usage -->

# Inputs

## Inputs

- `manifest-path`: (Required) Deployment file's path.

- `new-image-tag`: (Optional) Value to use as new tag. Defaults to `${{ github.sha }}`.

- `container-name`: (Required) Name of the container that uses the image. This parameter is used to target only one container.


## Outputs

- `old-image-tag`: Image tag before replacement.

# Scenarios

- [Set backend version to latest](#Set-backend-version-to-latest)

## Set backend version to latest

```yaml
### path/to/my/deployment.yaml ###
#
#    apiVersion: apps/v1
#    kind: Deployment
#    spec:
#      replicas: 1
#      selector:
#        matchLabels:
#          app: my-app
#      template:
#        metadata:
#          labels:
#            app: my-app
#        spec:
#          containers:
#            - name: backend
#              image: my-registry/backend:1.0
#              ports:
#                - containerPort: 80
#            - name: sidecar
#              image: sidecar:2.0
#              ports:
#                - containerPort: 9999
steps:
  - uses: Charlyzzz/update-k8s-image
    with:
      manifest-path: path/to/my/deployment.yaml
      new-image-tag: latest
      container-name: backend
```


# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
