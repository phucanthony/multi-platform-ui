import { Router } from 'express';
import { AppRegistry } from 'react-native';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import App from '../';
import * as webpackConfigs from '../../webpack.config.babel';

let gitHash = 'nope';
const router = Router(),
	production = process.env.ENV === 'production';

require('child_process').exec('git rev-parse HEAD', function(err, stdout) {
	if (err) console.log(err);
	else gitHash = stdout.toString().trim();
});

AppRegistry.registerComponent('App', () => App);

router.use('/api', (req, res, next) => {
	res.json({ message: 'Hi, this is your very first api!', });
});

router.use('*', (req, res, next) => {
	const initialProps = { ssrLocation: req.baseUrl, ssrContext: {} },
		{ element, stylesheets } = AppRegistry.getApplication('App', { initialProps, rootTag: 'root' }),
		initialHtml = renderToString(element),
		initialStyles = stylesheets.map(sheet => renderToStaticMarkup(sheet)).join('\n');

	res.render('../index', {
		initialStyles,
		initialHtml,
		serverSide: true,
		production,
		gitHash,
		publicPath: webpackConfigs.output.publicPath,});
});

module.exports = router;