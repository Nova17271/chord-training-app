import { useState } from 'react';
import SongSelector from './components/SongSelector';
import StepMode from './components/steps/StepMode';
import StepKey from './components/steps/StepKey';
import StepChord from './components/steps/StepChord';
import StepDetail from './components/steps/StepDetail';
import Summary from './components/Summary';

// 当用户上传音频（无标准答案）时，用一个默认的占位答案，
// 让流程能走通，但判分会明确提示「无标准答案」。
const NO_ANSWER = null;

function App() {
  const [phase, setPhase] = useState('select'); // select | practice | summary
  const [song, setSong] = useState(null);
  const [step, setStep] = useState(1);
  // 记录每个步骤的判分结果
  const [results, setResults] = useState({
    step1: null,
    step2: null,
    step3: null,
    details: [],
    notes: '',
  });

  const handleConfirm = (selected) => {
    setSong(selected);
    setPhase('practice');
    setStep(1);
    setResults({ step1: null, step2: null, step3: null, details: [], notes: '' });
  };

  const restart = () => {
    setPhase('select');
    setSong(null);
    setStep(1);
    setResults({ step1: null, step2: null, step3: null, details: [], notes: '' });
  };

  // 上传音频没有标准答案时：进入「自由练习」模式
  const hasAnswer = song?.song?.answer != null;

  const progress = ((step - 1) / 4) * 100;

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">🎸 扒谱训练营</div>
        {phase === 'practice' && (
          <div className="song-badge">{song.name}</div>
        )}
      </header>

      {phase === 'select' && <SongSelector onConfirm={handleConfirm} />}

      {phase === 'practice' && (
        <>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {!hasAnswer && (
            <div className="no-answer-banner">
              ⚠️ 当前为「上传音频」自由练习模式，无标准答案自动判分。请自行判断，完成四步即可。
            </div>
          )}

          {step === 1 && (
            <StepMode
              answer={hasAnswer ? song.song.answer : null}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <StepKey
              answer={hasAnswer ? song.song.answer : null}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepChord
              answer={hasAnswer ? song.song.answer : null}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <StepDetail
              answer={hasAnswer ? song.song.answer : null}
              onFinish={(detail) => {
                setResults((prev) => ({ ...prev, ...detail }));
                setPhase('summary');
              }}
            />
          )}
        </>
      )}

      {phase === 'summary' && (
        <Summary song={song} results={results} onRestart={restart} />
      )}
    </div>
  );
}

export default App;
