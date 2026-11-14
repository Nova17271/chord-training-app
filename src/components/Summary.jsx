// 练习总结页
export default function Summary({ song, results, onRestart }) {
  const total = 3; // 前三个步骤是有标准答案的判分步骤
  const correctCount = [results.step1, results.step2, results.step3].filter(Boolean).length;

  return (
    <div className="summary">
      <h2>🎉 练习完成</h2>
      <p className="subtitle">{song.name}</p>

      <div className="score-card">
        <div className="score-num">
          {correctCount} / {total}
        </div>
        <div className="score-label">正确步骤</div>
      </div>

      <div className="result-list">
        <div className={'result-item' + (results.step1 ? ' pass' : ' fail')}>
          <span className="result-step">步骤 1 · 大小调</span>
          <span className="result-mark">{results.step1 ? '✅' : '❌'}</span>
        </div>
        <div className={'result-item' + (results.step2 ? ' pass' : ' fail')}>
          <span className="result-step">步骤 2 · 具体调</span>
          <span className="result-mark">{results.step2 ? '✅' : '❌'}</span>
        </div>
        <div className={'result-item' + (results.step3 ? ' pass' : ' fail')}>
          <span className="result-step">步骤 3 · 匹配和弦</span>
          <span className="result-mark">{results.step3 ? '✅' : '❌'}</span>
        </div>
        <div className="result-item detail">
          <span className="result-step">步骤 4 · 细节</span>
          <span className="result-mark">
            {results.details.length > 0 ? `${results.details.length} 项` : '—'}
          </span>
        </div>
      </div>

      {results.notes && (
        <div className="notes-review">
          <h4>你的笔记</h4>
          <p>{results.notes}</p>
        </div>
      )}

      <button className="primary-btn" onClick={onRestart}>
        再练一首 →
      </button>
    </div>
  );
}
