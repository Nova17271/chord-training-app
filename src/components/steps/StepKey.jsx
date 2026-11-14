// 步骤 2：确定是哪个调（构成音 + 和弦组）
import { useState } from 'react';
import { majorScales, minorScales } from '../../data/chordLibrary';

export default function StepKey({ answer, onNext }) {
  const [choice, setChoice] = useState(null);
  const [judged, setJudged] = useState(false);

  const freeMode = answer == null;
  // 自由模式默认展示大调 + 小调所有调
  const scaleMap = freeMode || answer.mode === 'major' ? majorScales : minorScales;
  const keyOptions = Object.keys(scaleMap);

  const judge = (value) => {
    setChoice(value);
    setJudged(true);
  };

  const correct = !freeMode && judged && choice === answer.key;
  const displayKey = freeMode ? choice : answer.key;
  const displayScale = majorScales[displayKey] || minorScales[displayKey];

  return (
    <div className="step">
      <h2>步骤 2 / 4：确定是哪个调</h2>
      <p className="subtitle">
        通过听主音（do）所在的位置，确定具体的调。选择后下方会显示该调的构成音与和弦组。
      </p>

      {freeMode && (
        <div className="no-answer-banner small">
          自由练习模式：可任选大调或小调中的任意调查看其构成音与和弦组。
        </div>
      )}

      <div className="options key-options">
        {keyOptions.map((key) => {
          let cls = 'option key-option';
          if (judged && key === choice) cls += freeMode ? ' selected' : correct ? ' correct' : ' wrong';
          if (!freeMode && judged && key === answer.key) cls += ' correct';
          return (
            <button key={key} className={cls} onClick={() => judge(key)}>
              {key}
            </button>
          );
        })}
      </div>

      {judged && displayScale && (
        <div className="key-detail">
          <div className={freeMode ? 'feedback ok' : correct ? 'feedback ok' : 'feedback bad'}>
            {freeMode
              ? `你选择了「${choice}」，下面是它的构成音与和弦组。`
              : correct
              ? '✅ 正确！主音判断准确。'
              : `❌ 正确答案是「${answer.key}」。看看下面这个调的构成音，对比你听到的主音。`}
          </div>

          <div className="detail-card">
            <h4>「{displayKey}」的构成音（音阶）</h4>
            <div className="note-list">
              {displayScale.notes.map((n) => (
                <span key={n} className="note-chip">{n}</span>
              ))}
            </div>
            <h4>顺阶和弦组</h4>
            <div className="chord-list">
              {displayScale.notes.map((n, i) => {
                const root = n;
                const third = displayScale.notes[(i + 2) % 7];
                const fifth = displayScale.notes[(i + 4) % 7];
                const chord = `${root}${third}${fifth}`;
                return (
                  <span key={i} className="chord-chip">
                    {chord}
                    <small className="degree">({['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'][i]})</small>
                  </span>
                );
              })}
            </div>
          </div>
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
