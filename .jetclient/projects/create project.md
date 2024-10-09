```toml
name = 'create project'
method = 'POST'
url = 'http://localhost:5000/api/projects/1'
sortWeight = 4000000
id = '698aee7e-2d31-4101-8956-069feb923f88'

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
