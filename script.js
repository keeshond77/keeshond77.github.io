// Define the folder paths for images and thumbnails
const imagesPath = 'images/';
const thumbsPath = 'thumbs/';

// Function to Load Images and Descriptions
async function loadGallery() {
    try {
        // Fetch the descriptions text file
        let response = await fetch('descriptions.txt');
        
        // Check if the response is OK
        if (!response.ok) {
            console.error('Error fetching descriptions.txt:', response.statusText);
            return;
        }
        
        let text = await response.text();
        const lines = text.split('\n');
        const thumbnailsContainer = document.getElementById('thumbnails');

        lines.forEach(line => {
            if (line.trim()) {
                // Split filename and description using the pipe '|'
                let [filename, description] = line.split('|').map(item => item.trim());
                
                // Check if the filename or description is missing
                if (!filename || !description) {
                    console.warn(`Skipping invalid line: ${line}`);
                    return;
                }

                // Create a div to wrap the thumbnail and description
                const thumbDiv = document.createElement('div');
                thumbDiv.classList.add('thumbnail');

                // Create an image element for the thumbnail
                const thumbnailFile = filename.replace('.jpg', 's.jpg');
                const thumbnailPath = `${thumbsPath}${thumbnailFile}`;
                console.log(`Loading thumbnail: ${thumbnailPath}`); // Log the thumbnail path to the console

                const img = document.createElement('img');
                img.src = thumbnailPath;
                img.alt = description;
                img.addEventListener('click', () => showImage(filename, description));

                // Create a div for the description overlay
                const descDiv = document.createElement('div');
                descDiv.classList.add('description');
                descDiv.textContent = description;

                // Append elements to the thumbnail div
                thumbDiv.appendChild(img);
                thumbDiv.appendChild(descDiv);

                // Append the thumbnail div to the gallery
                thumbnailsContainer.appendChild(thumbDiv);
            }
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// Function to Show Full Image in a Modal
function showImage(filename, description) {
    const modal = document.getElementById('modal');
    const fullImage = document.getElementById('fullImage');
    const caption = document.getElementById('caption');

    fullImage.src = `${imagesPath}${filename}`;
    caption.textContent = description;
    modal.style.display = 'block';
}

// Close Modal Functionality
document.getElementById('closeModal').onclick = function () {
    document.getElementById('modal').style.display = 'none';
};

// Initial Call to Load the Gallery
document.addEventListener('DOMContentLoaded', loadGallery);
