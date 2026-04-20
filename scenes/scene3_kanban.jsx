// Scene 3: Kanban Dispatch Board — 10 to 18s
// Camera pulls back. The full board reveals. Cards flow New → Assigned → Done.
// Staff avatars assigned, tasks completing with green pulses.

function Scene3Kanban() {
  const t = useTime();
  if (t < 9.8 || t > 17.8) return null;
  const localT = t - 10.0;

  // Camera pull-back effect: start zoomed, end at normal scale
  const camScale = interpolate([0, 1.5, 7], [1.6, 1.0, 1.04], Easing.easeInOutCubic)(localT);
  const camY = interpolate([0, 1.5], [120, 0], Easing.easeInOutCubic)(localT);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Starfield count={50} />

      <div style={{
        position: 'absolute', inset: 0,
        transform: `scale(${camScale}) translateY(${camY}px)`,
        transformOrigin: '50% 50%',
      }}>
        {/* App chrome */}
        <Sprite start={10.0} end={17.6}>
          {({ localTime, duration }) => {
            const enter = Easing.easeOutCubic(Math.min(1, localTime / 0.6));
            const exit = Math.max(0, 1 - Math.max(0, localTime - (duration - 0.5)) / 0.5);
            return (
              <div style={{
                position: 'absolute',
                left: 80, top: 60, right: 80, bottom: 60,
                opacity: enter * exit,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                backdropFilter: 'blur(24px)',
                padding: 24,
                display: 'flex', flexDirection: 'column', gap: 18,
                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)',
              }}>
                <KanbanHeader />
                <KanbanBoard localT={localTime} />
              </div>
            );
          }}
        </Sprite>
      </div>
    </div>
  );
}

function KanbanHeader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <LogoMark size={28} />
        <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9' }}>Dispatch</div>
      </div>
      <div style={{ marginLeft: 20, display: 'flex', gap: 8 }}>
        {['All', 'Urgent', 'Housekeeping', 'F&B', 'Maintenance'].map((f, i) => (
          <div key={f} style={{
            fontSize: 12, padding: '5px 11px', borderRadius: 99,
            background: i === 0 ? 'rgba(96,165,250,0.15)' : 'rgba(255,255,255,0.04)',
            color: i === 0 ? '#60a5fa' : '#94a3b8',
            border: i === 0 ? '1px solid rgba(96,165,250,0.3)' : '1px solid rgba(255,255,255,0.06)',
            fontWeight: i === 0 ? 600 : 500,
          }}>{f}</div>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%', background: '#06d6a0',
          boxShadow: '0 0 8px #06d6a0',
        }} />
        <div style={{ fontSize: 12, color: '#06d6a0', fontWeight: 600 }}>Live · 12 active</div>
      </div>
    </div>
  );
}

const COLUMNS = [
  { key: 'new', label: 'New', color: '#60a5fa' },
  { key: 'assigned', label: 'In Progress', color: '#fbbf24' },
  { key: 'done', label: 'Completed', color: '#06d6a0' },
];

// Tasks and which column they're in at various times (t is localTime, 0..8)
const TASKS = [
  { id: 1, dept: 'housekeeping', room: '412', title: 'Extra towels + champagne', assignee: 'MR', transitions: { new: 0, assigned: 1.2, done: 3.8 } },
  { id: 2, dept: 'maintenance', room: '207', title: 'AC not cooling', assignee: 'JK', transitions: { new: 0.3, assigned: 1.8, done: 5.2 } },
  { id: 3, dept: 'fnb', room: '318', title: 'Late menu service', assignee: 'EL', transitions: { new: 0.6, assigned: 2.2, done: 4.6 } },
  { id: 4, dept: 'frontdesk', room: '501', title: 'Late checkout request', assignee: 'AN', transitions: { new: 0.9, assigned: 2.8, done: 4.0 } },
  { id: 5, dept: 'housekeeping', room: '225', title: 'Pillow replacement', assignee: 'MR', transitions: { new: 1.2, assigned: 3.0, done: 5.8 } },
  { id: 6, dept: 'spa', room: '810', title: 'Spa booking · 9am', assignee: 'TK', transitions: { new: 1.5, assigned: 3.4, done: 6.4 } },
  { id: 7, dept: 'security', room: '7F', title: 'Noise complaint', assignee: 'RV', transitions: { new: 1.8, assigned: 3.8 } },
  { id: 8, dept: 'maintenance', room: '614', title: 'TV remote', assignee: 'JK', transitions: { new: 2.1, assigned: 4.2 } },
  { id: 9, dept: 'housekeeping', room: '118', title: 'Turn down', assignee: 'MR', transitions: { new: 2.6 } },
  { id: 10, dept: 'fnb', room: '412', title: 'Breakfast delivery', assignee: 'EL', transitions: { new: 3.2 } },
];

function KanbanBoard({ localT }) {
  return (
    <div style={{
      flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18,
    }}>
      {COLUMNS.map((col) => (
        <KanbanColumn key={col.key} col={col} localT={localT} />
      ))}
    </div>
  );
}

function KanbanColumn({ col, localT }) {
  // Determine which tasks live in this column right now
  const cards = TASKS.filter(task => {
    const trans = task.transitions;
    if (col.key === 'new') return localT >= trans.new && (trans.assigned == null || localT < trans.assigned);
    if (col.key === 'assigned') return trans.assigned != null && localT >= trans.assigned && (trans.done == null || localT < trans.done);
    if (col.key === 'done') return trans.done != null && localT >= trans.done;
    return false;
  });

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 14,
      padding: 14,
      display: 'flex', flexDirection: 'column', gap: 10,
      minHeight: 0, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          {col.label}
        </div>
        <div style={{
          marginLeft: 'auto', fontSize: 11, color: '#64748B',
          background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 99,
          fontVariantNumeric: 'tabular-nums',
        }}>{cards.length}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cards.map((task) => {
          const enterAt = col.key === 'new' ? task.transitions.new
            : col.key === 'assigned' ? task.transitions.assigned
            : task.transitions.done;
          const age = localT - enterAt;
          const enter = Easing.easeOutBack(Math.min(1, age / 0.4));
          const opacity = Math.min(1, age / 0.25);
          return (
            <div key={task.id} style={{
              opacity,
              transform: `translateY(${(1 - enter) * 12}px) scale(${0.96 + enter * 0.04})`,
              willChange: 'transform, opacity',
            }}>
              <TaskCard task={task} status={col.key} justEntered={age < 0.6} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({ task, status, justEntered }) {
  const dept = DEPT_COLORS[task.dept];
  const isDone = status === 'done';
  return (
    <div style={{
      background: isDone ? 'rgba(6,214,160,0.06)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${isDone ? 'rgba(6,214,160,0.2)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: 10,
      padding: '10px 12px',
      boxShadow: justEntered ? `0 0 0 2px ${isDone ? 'rgba(6,214,160,0.25)' : 'rgba(96,165,250,0.25)'}` : 'none',
      transition: 'box-shadow 500ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
          background: dept.bg, color: dept.fg,
          padding: '2px 6px', borderRadius: 99,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>{dept.label}</span>
        <span style={{ fontSize: 10, color: '#64748B', fontFamily: 'JetBrains Mono, monospace', marginLeft: 'auto' }}>
          RM {task.room}
        </span>
      </div>
      <div style={{
        fontSize: 13, color: isDone ? '#94a3b8' : '#E2E8F0', fontWeight: 500,
        textDecoration: isDone ? 'line-through' : 'none',
        marginBottom: 6,
      }}>{task.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          background: 'linear-gradient(135deg, #60a5fa, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 700, color: 'white',
        }}>{task.assignee}</div>
        {isDone && (
          <div style={{ fontSize: 10, color: '#06d6a0', fontWeight: 600, marginLeft: 'auto' }}>
            ✓ Done
          </div>
        )}
      </div>
    </div>
  );
}

function LogoMark({ size = 24 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: 'linear-gradient(135deg, #60a5fa 0%, #34e2b6 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 6px ${size * 0.5}px -${size * 0.2}px rgba(96,165,250,0.6)`,
    }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5L8.5 5 12 6.5 8.5 8 7 11.5 5.5 8 2 6.5 5.5 5 7 1.5z" fill="#061018" />
      </svg>
    </div>
  );
}

window.Scene3Kanban = Scene3Kanban;
window.LogoMark = LogoMark;
