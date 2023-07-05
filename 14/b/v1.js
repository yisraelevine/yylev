const myCommentsID = document.querySelector('#myCommentsID>.e-con-inner');
const comments = Array.from(document.querySelector('.page-content #comments .comment-list').children);
const commentTextbox = document.querySelector('.page-content #comment');
const node = myCommentsID.children[0];
const spanNode = document.createElement('span');
spanNode.setAttribute('class', 'loadmore32');
spanNode.innerText = 'עוד';
node.remove();

for (let i = 0; i < comments.length; i++) {
    const el = comments.pop();
    const clone = node.cloneNode(true);
    const time = el.querySelector('time').innerText.split(' –', 2);
    const p = el.querySelector('p').innerText.replaceAll('\n', ' ');

    clone.querySelector('.my-com-header h2').innerText = el.querySelector('.fn').innerText;
    clone.querySelector('p').innerText = p;
    clone.querySelector('.my-com-time h2').innerText = time[0] + ' ' + time[1].split('שעה ', 2)[1];

    if (clone.querySelector('p').innerText.length > 250) {
        const spanClone = spanNode.cloneNode(true);
        clone.querySelector('p').innerText = p.substr(0, 150) + '...';
        spanClone.addEventListener('mousedown', function () {
            clone.querySelector('p').innerText = p;
        });
        clone.querySelector('p').appendChild(spanClone);
    }
    myCommentsID.appendChild(clone);
    console.log(i);
}

commentTextbox.setAttribute('placeholder', 'כל התגובות עוברות לאישור אין טעם לשלוח יותר מפעם אחת תגובה לא מתאימה תוסר');
commentTextbox.setAttribute('rows', 3);