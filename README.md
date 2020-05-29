## [Applanga](https://www.applanga.com/) CLI setup GitHub action

The action enables:
* pushing sources for translation from your GitHub repository into Applanga project, and 
* pulling the translated files from Applanga portal into your repository.

The benefit of using github workflows is that you can automate your localization process without the need to share any repository credentials with your localization provider.

### Setup

To use github workflows on your repository you need to create a folder called `.github/workflows/` and place the workflow configuration .yml files in there. Additonally you also need a `.applanga.json configuration file present in your repository.

For a detailed example with setup instructions see the [applanga/github-workflow-example](https://github.com/applanga/github-workflow-example)
