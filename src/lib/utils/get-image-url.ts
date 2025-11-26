export function get_image_url(collectionId, recordId, fileName, options = {}) {
	const {
		width = 800, // Default width (if not provided)
		height = 0, // Default height (0 means auto-scale)
		fit = 'fill', // e.g., 'fill', 'fit', 'crop'
		quality = 80, // JPEG/WebP quality (0-100)
		gravity = 'sm' // 'sm' = smart gravity (focuses on objects/faces)
	} = options;

	// 1. Define the base URL and R2 bucket path
	const PROXY_URL = 'https://images.3xw.ca';
	const BUCKET_NAME = 'agraf'; // Use the name you configured in Imgproxy

	// The path structure Imgproxy uses to fetch from R2:
	// s3://<BUCKET_NAME>/<COLLECTION_ID>/<RECORD_ID>/<FILE_NAME>
	const sourceUrl = `s3://${BUCKET_NAME}/${collectionId}/${recordId}/${fileName}`;

	// 2. Encode the source URL to base64 (required by Imgproxy for 'encoded' URLs)
	// This helps prevent issues with special characters in the URL.
	// Note: We use .replace() for URL-safe base64 encoding (standard Imgproxy practice).
	const encodedSource = btoa(sourceUrl).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

	// 3. Construct the transformation parameters
	const params = [
		// Resize parameters (rs:fit_type:width:height)
		`rs:${fit}:${width}:${height}`,
		// Gravity (g:type)
		`g:${gravity}`,
		// Quality (q:value)
		`q:${quality}`
	].join('/');

	// 4. Assemble the final URL
	// Structure: https://<PROXY_URL>/<TRANSFORMATION_PARAMS>/<ENCODED_SOURCE>
	// We force .webp, which Imgproxy converts from the original image file.
	return `${PROXY_URL}/${params}/${encodedSource}.webp`;
}
