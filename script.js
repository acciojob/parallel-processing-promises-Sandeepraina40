//your JS code here. If required.
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url){
	return new Promise((resolve,reject) => {
		const img = new Image();
		img.alt = "Image From " + url;
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error("Failed to load" + url));
		img.src = url;
	});
}

function downloadImages(){
	output.innerHTML = "";
	error.textContent = "";
	loading.handle = false;

	const promise = images.map(img => downloadImage(img.url));
	Promise.all(promise).then(downloadImages => {
		downloadImages.forEach(img => output.appendChild(img));
	}).catch(err => {
		error.textContent = err.message;
	}).finally(() => {
		loading.hidden = true;
	});
}

btn.addEventListener("click",downloadImages);


btn.addEventListener("click",downloadImages);