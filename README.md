# update-k8s-image action

This action prints modifies a Kubernetes deployment file by updating a container image version.

# Usage

<!-- start usage -->

```yaml
- uses: Charlyzzz/update-k8s-image
  with:
    # Path to the yaml manifest. Required.
    manifest-path: ''

    # Value that will replace current image tag. Required
    new-image-tag: ''

    # Image name used to disambiguate specs. Required.
    name: ''

```

<!-- end usage -->

# Scenarios

- [Set backend version to latest](#Set-backend-version-to-latest)

## Set backend version to latest

```yaml
# Sample deployment file
###
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
- uses: Charlyzzz/update-k8s-image
  with:
    manifest-path: 'path/to/my/deployment'
    new-image-tag: 'latest'
    name: 'backend'
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)