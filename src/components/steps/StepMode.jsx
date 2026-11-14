// 步骤 1：确定大小调
import { useState } from 'react';

export default function StepMode({ answer, onNext }) {
  const [choice, setChoice] = useState(null);
  const [judged, setJudged] = useState(false);

  const freeMode = answer == null; // 无标准答案

  const options = [
    { value: 'major', label: '大调 (Major)', desc: '听感明亮、欢快、稳定' },
    { value: 'minor', label: '小调 (Minor)', desc: '听感柔和、忧伤、暗淡' },
  ];

  const judge = (value) => {
    setChoice(value);
    setJudged(true);
  };

  const correct = !freeMode && judged && choice === answer.mode;

  return (
    <div className="step">
      <h2>步骤 1 / 4：确定大小调</h2>
      <p className="subtitle">仔细听音乐的整体情绪，判断它是大调还是小调</p>

      <div className="options">
        {options.map((opt) => {
          let cls = 'option';
          if (judged && opt.value === choice) cls += freeMode ? ' selected' : correct ? ' correct' : ' wrong';
          if (!freeMode && judged && opt.value === answer.mode) cls += ' correct';
          return (
            <button key={opt.value} className={cls} onClick={() => judge(opt.value)}>
              <span className="opt-label">{opt.label}</span>
              <span className="opt-desc">{opt.desc}</span>
            </button>
          );
        })}
      </div>

      {judged && (
        <div className={freeMode ? 'feedback ok' : correct ? 'feedback ok' : 'feedback bad'}>
          {freeMode
            ? `你选择了「${choice === 'major' ? '大调' : '小调'}」，自由练习模式，继续下一步。`
            : correct
            ? '✅ 正确！判断为大调/小调很准确。'
            : `❌ 再听一听，正确答案是「${answer.mode === 'major' ? '大调' : '小调'}」。`}
        </div>
      )}

      {judged && (
        <button className="primary-btn" onClick={onNext}>
          下一步 →
        </button>
      )}
    </div>
  );
}
