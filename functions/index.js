const functions = require("firebase-functions");
const request = require("request");
const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");

exports.linkPreview = functions.https.onRequest((req, res) => {
	request(req.query.url, (err, response, html) => {
		if (!err && response.statusCode === 200) {
			const doc = domino.createWindow(html).document;
			const meta = getMetadata(doc, req.query.url);

			return res.status(200).json({
				success: 1,
				meta: {
					...meta,
					image: {
						url: meta.image || meta.icon || ""
					}
				}
			});
		} else {
			return res.status(500).json({ success: 0 });
		}
	});
});
