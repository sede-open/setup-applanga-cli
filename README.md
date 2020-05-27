## Applanga CLI setup GitHub action

The action enables:
* pushing sources for translation from your GitHub repository into Applanga project, or 
* pulling the translated files from Applanga portal into your repository.

### Setup

It's assumed you already have the [Applanga CLI](https://www.applanga.com/docs/integration-documentation/cli) configuration included in your GitHub repository and the project is setup in the Applanga portal. 
Multiple Applanga configurations in the same repository can be used. 

### Usage

#### Example workflow for uploading source files to Applanga portal

In the example, the workflow is run on every push into the master branch. By adding more steps with diffrent the `working-directory` option, you can chose different Applanga configuration file to be used.

```yml
name: "PushSources"
on:
 push:
   branches:
     - master
jobs:
  push-sources-for-translation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          path: 'checkout'
      - uses: applanga/setup-applanga-cli@v1.0.0
        with:
          version: 1.0.45
      - name: Pull translations from Applanga
        run: applanga push
        working-directory: checkout
```

#### Example workflow for downloading translations from Applanga portal

In the example, the workflow is run every 3 hours. A pull request is created from the downloaded files.

```yml
name: "PullTranslations"
on:
  schedule:
   - cron:  '* 0/3 * * *'
jobs:
  pull-translation-in:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.head_ref }}
          path: 'checkout'
      - uses: applanga/setup-applanga-cli@v1.0.0
        with:
          version: 1.0.45
      - name: Pull translations from Applanga
        run: applanga pull
        working-directory: checkout
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v2
        with:
          branch: newTranslations
          commit-message: Updated translations
          title: Updated translations 
          body: Pulled in new translations from Applanga portal
          path: 'checkout'
```
