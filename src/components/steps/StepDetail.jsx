// 步骤 4：一些细节
// 这一阶段是开放式总结，让用户反思扒谱过程中的细节，例如：
// 转调、副属和弦、低音线条、节奏型、编配等。
import { useState } from 'react';

export default function StepDetail({ answer, onFinish }) {
  const [notes, setNotes] = useState('');
  const [details, setDetails] = useState([]);

  const detailOptions = [
    '注意了低音线条 (bass line)',
    '识别了副属和弦 / 离调和弦',
    '发现了转调 (modulation)',
    '听出了节奏型与律动',
    '辨别了和弦转位 (inversion)',
    '留意了加音和弦 (add9 / sus 等)',
  ];

  const toggle = (d) => {
    setDetails((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  return (
    <div className="step">
      <h2>步骤 4 / 4：一些细节</h2>
      <p className="subtitle">
        扒谱高手和普通人的差距往往在细节。回顾你刚才的听辨过程，标记你额外留意到的细节。
      </p>

      <div className="detail-options">
        {detailOptions.map((d) => (
          <button
            key={d}
            className={'detail-chip' + (details.includes(d) ? ' active' : '')}
            onClick={() => toggle(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="notes-area">
        <h4>补充笔记（可选）</h4>
        <textarea
          placeholder="记录你在扒谱中的心得体会、难点、下次要注意的地方..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
        />
      </div>

      <button className="primary-btn" onClick={() => onFinish({ details, notes })}>
        完成练习，查看总结 →
      </button>
    </div>
  );
}
