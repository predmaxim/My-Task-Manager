```toml
name = 'delete project'
method = 'DELETE'
url = 'http://localhost:5000/api/projects/1'
sortWeight = 3000000
id = 'dc074dc9-4ae0-407d-8189-5faaffd66a17'

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
