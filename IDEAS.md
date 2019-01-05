# Ideas for future features

## Link to each of the repos, so its easy to go to a particular repository
Maybe a mouse-over transition, like a slide-down drawer containing a link-arrow?


## Sort and/or search
Sort by metrics/attributes, e.g. “has readme”
And search, like “codeclimate” / “NOT codeclimate” to show repos that have/don’t have content with that string


## Add a details page, so a repo card can be clicked and shows the entire readme.


## Regularly re-check data.json for new data
But avoid constantly re-downloading it… it’s a sizeable file.
So maybe generate a hash that lives in a separate resource (data.json.hash?), 
and hammer *that* from the client.
Also consider adding a debug view to see underlying data, 
like CMD+D to show components for fetching status, the request history, etc.


## Show if repository is a fork or archived


## Show if upstream is archived
If the repo is a fork and the fork has been archived, show that.


## Show how far ahead/behind repo master is from upstream master
