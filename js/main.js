/* global document, alert */

import '../css/reset.css';
import '../css/style.css';

const hiddenClass = 'hidden';
const stepCurrentClass = 'step-info__step--current';
const stepActiveClass = 'step-info__step--active';

document.addEventListener('DOMContentLoaded', () => {
  const formValues = {
    userName: '',
    userEmail: '',
    interestedTopic: [],
  };

  const userInfoForm = document.getElementById('user-info-form');
  const topicForm = document.getElementById('topic-form');
  const summaryForm = document.getElementById('summary-form');

  const stepInfoText = document.getElementById('step-info-text');
  const stepOne = document.getElementById('step-one');
  const stepTwo = document.getElementById('step-two');
  const stepThree = document.getElementById('step-three');

  const handleUserInfoNext = (e) => {
    e.preventDefault();

    formValues['userName'] = document.querySelector(
      "input[name='userName']",
    ).value;
    formValues['userEmail'] = document.querySelector(
      "input[name='userEmail']",
    ).value;

    userInfoForm.classList.add(hiddenClass);
    topicForm.classList.remove(hiddenClass);

    stepInfoText.textContent = 'Step 2 of 3';
    stepOne.classList.remove(stepCurrentClass);
    stepOne.classList.add(stepActiveClass);
    stepTwo.classList.add(stepCurrentClass);
  };

  const handleTopicNext = (e) => {
    e.preventDefault();

    const checkedCheckBoxNodeList = document.querySelectorAll(
      "input[name='interestedTopic']:checked",
    );

    // トピックが1つも選択されていない場合は次に進まず、最低1つ選択を促す
    if (checkedCheckBoxNodeList.length === 0) {
      const topicErrorMsg = document.getElementById('topic-error-msg');
      topicErrorMsg.classList.remove(hiddenClass);
      return;
    }

    formValues['interestedTopic'] = Array.from(checkedCheckBoxNodeList).map(
      (checkBox) => checkBox.value,
    );
    setSummary();

    topicForm.classList.add(hiddenClass);
    summaryForm.classList.remove(hiddenClass);

    stepInfoText.textContent = 'Step 3 of 3';
    stepTwo.classList.remove(stepCurrentClass);
    stepTwo.classList.add(stepActiveClass);
    stepThree.classList.add(stepCurrentClass);
  };

  const setSummary = () => {
    const summaryUserName = document.getElementById('summary-user-name');
    const summaryUserEmail = document.getElementById('summary-user-email');
    const summaryTopicInfoList = document.getElementById(
      'summary-topic-info-list',
    );

    summaryUserName.textContent = formValues['userName'];
    summaryUserEmail.textContent = formValues['userEmail'];

    if (formValues['interestedTopic'].length === 0) return;

    summaryTopicInfoList.innerHTML = '';
    formValues['interestedTopic'].forEach((topic) => {
      const topicText = document.createTextNode(topic);
      const topicListItem = document.createElement('li');
      topicListItem.appendChild(topicText);
      summaryTopicInfoList.appendChild(topicListItem);
    });
  };

  userInfoForm.addEventListener('submit', handleUserInfoNext);
  topicForm.addEventListener('submit', handleTopicNext);

  summaryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    alert(
      '✅ Success.\n(dummy submit. The information you entered has not been sent anywhere.)',
    );
  });
});
