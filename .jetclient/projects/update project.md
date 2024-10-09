```toml
name = 'update project'
method = 'PATCH'
url = 'http://localhost:5000/api/projects/1'
sortWeight = 2000000
id = 'aefa53b5-0e7e-439c-b4ee-9d25771d3d51'

[body]
type = 'JSON'
raw = '''
{
  "id": 1,
  "name": "Project 1",
  "icon": null,
  "color": "#FF0000",
  "userId": 1,
  "created": "2021-01-01T00:00:00.000Z",
}'''
```
