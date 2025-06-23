const myElement = document.getElementById('top_content');

var oldX = 0;
const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        const addressData = document.getElementById('address_data');
        const newRect = addressData.getBoundingClientRect();
        console.log(newRect);
        let newX = newRect.x;
        if (oldX != newX) {
            const addressTitle = document.getElementById('address_title');
            if (newX == 8) {
                console.log('1');
                addressTitle.style.paddingTop = "20px";
            } else {
                console.log('2');
                addressTitle.style.paddingTop = "31px";
            }
        }
        oldX = newX;
    }
});

resizeObserver.observe(myElement);