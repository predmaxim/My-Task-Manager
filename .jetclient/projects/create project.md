```toml
name = 'create project'
method = 'POST'
url = 'http://localhost:5000/api/projects'
sortWeight = 4000000
id = '698aee7e-2d31-4101-8956-069feb923f88'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTczMDY1OTY2NywiZXhwIjoxNzMwNjYwNTY3fQ.T6N0Nd0W4Cow2OIZ4cr3bxQCviRtnTjYenFVeiOCKeQ'

[body]
type = 'JSON'
raw = '''
{
  "name": "Project 1",
  "slug": "project-1",
  "icon": null,
  "color": "#FF0000",
  "userId": 31,
  "created": "2021-01-01T00:00:00.000Z",
}'''
```
