const core = require('@actions/core');
const toolCache = require('@actions/tool-cache');
const process = require('process');
const childProcess = require('child_process');


async function run() {
	try {
		const applanga = 'applanga'
		const osPlatform = process.platform;
		var url = '', extractedFile = '';
		//getting version from workflow input
		const version = core.getInput('version');

		//checking if the file was alredy downloaded
		//if so, no need to redownload 
		const cachePath = toolCache.find(applanga, version);
		if (cachePath && cachePath !== '') {
			core.addPath(cachePath);
			return;
		}

		//figuring out teh download path
		switch (osPlatform) {
			case 'win32':
				url = 'https://github.com/applanga/applanga-cli/releases/download/' + version + '/applanga_windows.zip';
				break;
			case 'darwin':
				url = 'https://github.com/applanga/applanga-cli/releases/download/' + version + '/applanga_osx.tar.gz';
				break;
			case 'linux':
				url = 'https://github.com/applanga/applanga-cli/releases/download/' + version + '/applanga_linux.tar.gz';
				break;
			default:
				core.setFailed('Unsupported OS system');
				return;
		}
		const downloaded = await toolCache.downloadTool(url);

		//unpacking the downloaded file
		switch (osPlatform) {
			case 'win32':
				extractedFile = await toolCache.extractZip(downloaded, 'extracted');
				break;
			case 'darwin':
			case 'linux':
				extractedFile = await toolCache.extractTar(downloaded, 'extracted');
				break;
			default:
				core.setFailed('Unsupported OS system');
				return;
		}

		//adding teh path to teh enviroment
		const finalPath = await toolCache.cacheDir(extractedFile, applanga, version);
		core.addPath(finalPath);

		//setting rights to run the command
		if (osPlatform !== 'win32') {
			childProcess.exec(`chmod +x ${finalPath}/${applanga}`);
		}
	} catch (err) {
		core.setFailed(err);
	}
}

run();
