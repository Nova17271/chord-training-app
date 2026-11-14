// 步骤 3：匹配和弦（根据旋律、已使用和弦、套路库）
import { useState } from 'react';
import { chordProgressions, progressionToChords, majorScales, minorScales } from '../../data/chordLibrary';

export default function StepChord({ answer, onNext }) {
  const [chosenChords, setChosenChords] = useState([]);
  const [judged, setJudged] = useState(false);

  const freeMode = answer == null;

  // 候选和弦：有答案用该调的顺阶和弦；自由模式给出一组常用调的和弦
  const chordOptions = freeMode
    ? ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim', 'C7', 'G7', 'D', 'E', 'A', 'Am', 'Fm']
    : answer.diatonicChords;

  const toggleChord = (chord) => {
    if (chosenChords.includes(chord)) {
      setChosenChords(chosenChords.filter((c) => c !== chord));
    } else {
      setChosenChords([...chosenChords, chord]);
    }
  };

  const judge = () => setJudged(true);

  let correct = false;
  let target = [];
  let targetSet = [];
  if (!freeMode) {
    target = answer.progressionChords;
    targetSet = [...new Set(target)].sort();
    const chosenSet = [...chosenChords].sort();
    correct =
      targetSet.length === chosenSet.length &&
      targetSet.every((v, i) => v === chosenSet[i]);
  }

  // 套路库：有答案时按调匹配；自由模式展示全部
  const matchedProgressions = freeMode
    ? chordProgressions
    : chordProgressions.filter((p) => {
        const pChords = progressionToChords(p.progression, answer.key);
        return pChords.some((c) => targetSet.includes(c));
      });

  const displayKey = freeMode ? 'C 大调' : answer.key;

  return (
    <div className="step">
      <h2>步骤 3 / 4：匹配和弦</h2>
      <p className="subtitle">
        根据旋律走向、已使用的和弦，从套路库中找到最可能的和弦进行。
        勾选出你听到/推断出的和弦（不限顺序）。
      </p>

      {answer?.melodyHint && (
        <div className="melody-hint">
          <strong>旋律提示：</strong>
          {answer.melodyHint}
        </div>
      )}

      <div className="chord-pick">
        {chordOptions.map((chord) => (
          <button
            key={chord}
            className={
              'chord-pick-btn' + (chosenChords.includes(chord) ? ' active' : '')
            }
            onClick={() => toggleChord(chord)}
          >
            {chord}
          </button>
        ))}
      </div>

      {!judged && (
        <button
          className="primary-btn"
          disabled={chosenChords.length === 0}
          onClick={judge}
        >
          提交答案
        </button>
      )}

      {judged && (
        <div className="chord-result">
          <div className={freeMode ? 'feedback ok' : correct ? 'feedback ok' : 'feedback bad'}>
            {freeMode
              ? '自由练习模式：以下为你的选择与常用套路库参考。'
              : correct
              ? '✅ 完全正确！你精准匹配出了这首歌的和弦。'
              : '❌ 还不完全对，看看下面的对比和套路推荐。'}
          </div>

          <div className="detail-card">
            {!freeMode && (
              <>
                <h4>标准答案和弦</h4>
                <div className="chord-list">
                  {target.map((c, i) => (
                    <span key={i} className="chord-chip">{c}</span>
                  ))}
                </div>
              </>
            )}
            <h4>你的答案</h4>
            <div className="chord-list">
              {chosenChords.length ? (
                chosenChords.map((c, i) => (
                  <span
                    key={i}
                    className={'chord-chip' + (!freeMode && targetSet.includes(c) ? '' : ' extra')}
                  >
                    {c}
                  </span>
                ))
              ) : (
                <span className="hint">（未选择）</span>
              )}
            </div>

            <h4>套路库推荐（{displayKey}）</h4>
            <div className="progression-list">
              {matchedProgressions.map((p) => {
                const pChords = progressionToChords(p.progression, displayKey);
                return (
                  <div key={p.id} className="progression-item">
                    <div className="prog-name">
                      {p.name} <span className="prog-style">{p.style}</span>
                    </div>
                    <div className="prog-chords">
                      {pChords.map((c, i) => (
                        <span key={i} className="chord-chip small">{c}</span>
                      ))}
                    </div>
                    <div className="prog-desc">{p.description}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="primary-btn" onClick={onNext}>
            下一步 →
          </button>
        </div>
      )}
    </div>
  );
}
