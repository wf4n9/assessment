(function() {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    userNameInput.onkeydown = (event) => {
        if(event.keyCode === 13) {
            assessmentButton.onclick();
        }
    }

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        // ガード句
        if(userName.length === 0) {
            return;
        }
        console.log(userName);

        removeAllChildren(resultDivided);
        removeAllChildren(tweetDivided);

        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);
    
        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=YourAssessment&text=' + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #YourAssessment'; 
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();

    }



    const answers = [
        '{userName}のいいところは声です。',
        '{userName}のいいところは情熱です。',
        '{userName}のいいところはなんでしょうね？',
        '{userName}、マルチカーソルって機能知っていましたか？',
        '{userName}は知りませんでした。',
        '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振舞に多くの人が癒やされています。'
    ]

    /**
     * 指定した要素の子要素をすべて削除する
     * @param {HTMLElement} element HTMLの要素 
     */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザの名前
     * @return {string} 診断結果 
     */
    function assessment(userName) {
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);
        return result;
    }

    // テストコード
    console.assert(
        assessment('Taro') === 'Taroのいいところは情熱です。',
        '診断結果が間違っています'
    );
    console.assert(
        assessment('Jiro') === assessment('Jiro'),
        '同じ名前が正しく処理されていません'
    );
    console.log(assessment('Taro'));
    console.log(assessment('Jiro'));
})();
