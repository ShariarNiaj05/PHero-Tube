const loadCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    const allCategory = data.data
    const tabContainer = document.getElementById('tab-container');

    allCategory?.forEach((category) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <a onclick="loadCategoryPost('${category?.category_id}')" class="tab font-bold text-2xl">${category?.category}</a>
        `
        tabContainer.appendChild(div)
    });
}



const loadCategoryPost = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    const allPost = data.data;

    console.log(allPost);
    const postContainer = document.getElementById('post-container')
    postContainer.textContent = ''
    
    if (allPost.length === 0) {
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="card text-center md:text-center">
                <div class="container mx-auto">
                    <img class="text-center" src="./images/Icon.png" alt="Shoes" />
                    <p class="font-bold text-center text-2xl">No data to show in this category</p>
                </div>    
            </div>
                `
        postContainer.appendChild(div)
        console.log('no data');
    }
    else {
        allPost?.forEach((post) => {

            /*  let timeInSeconds = post?.others?.posted_date;
             let timeInMinutes = Math.floor(timeInSeconds / 60)
             let timeInHours = Math.floor(timeInMinutes / 60) */
    
            let hours = Math.floor(post?.others?.posted_date / 3600);
            let minutes = Math.floor((post?.others?.posted_date - (hours * 3600)) / 60);
            let time = hours + 'hrs ' + minutes + 'min ago';
    
            const viewsString = post?.others?.views;
            const viewsSplit = viewsString.split("k")
            // console.log(viewsSplit);

            const div = document.createElement('div')
            div.innerHTML = `
                <div class="card text-center md:text-left">
                    <div class="relative">
                    <figure><img class="h-[250px] " src="${post?.thumbnail}" alt="Shoes" /></figure>
                    <p class="text-white bg-black  absolute top-48 right-10">${post?.others?.posted_date ? time : ''}</p>
                    </div>
                    
                <div class="card-body">
                    
                    <h2 class="card-title justify-center md:justify-start"> <img class="w-10 h-10 rounded-full" src="${post?.authors[0]?.profile_picture}"> ${post?.title}</h2>
                    <p>
                    ${post?.authors[0]?.profile_name} ${post?.authors[0]?.verified ? '<img class="w-5 inline" src="./images/verified.png">' : ''}
                    </p>
                    <p>${post?.others?.views} views</p>
                </div>
              </div>
                `
            postContainer.appendChild(div)
        })
    }
}


loadCategory()

loadCategoryPost('1005')