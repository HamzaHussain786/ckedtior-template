/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	devtool: 'source-map',
	performance: { hints: false },

	entry: path.resolve( __dirname, 'src', 'ckeditor.js' ),

	output: {
		// The name under which the editor will be exported.
		library: 'ClassicEditor',

		path: path.resolve( __dirname, 'build' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	optimization: {
		minimizer: [
			new TerserPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				},
				extractComments: false
			} )
		]
	},

	plugins: [
		new CKEditorWebpackPlugin( {
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en',
			additionalLanguages: 'all'
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} ),
		new webpack.NormalModuleReplacementPlugin(
			/bold\.svg/,
			path.resolve( __dirname, 'src/assets', 'bold.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/italic\.svg/,
			path.resolve( __dirname, 'src/assets', 'italic.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/underline\.svg/,
			path.resolve( __dirname, 'src/assets', 'underline.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/align-left\.svg/,
			path.resolve( __dirname, 'src/assets', 'align-left.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/align-center\.svg/,
			path.resolve( __dirname, 'src/assets', 'align-center.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/align-right\.svg/,
			path.resolve( __dirname, 'src/assets', 'align-right.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/align-justify\.svg/,
			path.resolve( __dirname, 'src/assets', 'align-justify.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/bulletedlist\.svg/,
			path.resolve( __dirname, 'src/assets', 'list-bull-default.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/numberedlist\.svg/,
			path.resolve( __dirname, 'src/assets', 'list-num-default.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/image\.svg/,
			path.resolve( __dirname, 'src/assets', 'image.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/link\.svg/,
			path.resolve( __dirname, 'src/assets', 'link.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/table\.svg/,
			path.resolve( __dirname, 'src/assets', 'table.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/dropdown-arrow\.svg/,
			path.resolve( __dirname, 'src/assets', 'action-next.svg' )
		)
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig( {
							themeImporter: {
								themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
							},
							minify: true
						} )
					}
				]
			}
		]
	}
};
