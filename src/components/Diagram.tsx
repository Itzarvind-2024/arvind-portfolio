export type DiagramNode = { label: string; sub?: string };
export type DiagramData = { rows: DiagramNode[][]; caption?: string };

// Architecture diagram: stacked layers of boxes, top to bottom, joined by arrows.
export function Diagram({ data }: { data: DiagramData }) {
  return (
    <figure className="diagram">
      <div className="diagram-body">
        {data.rows.map((row, i) => (
          <div key={i} className="diagram-layer">
            {i > 0 && <div className="diagram-arrow" aria-hidden="true" />}
            <div className="diagram-row" style={{ "--cols": row.length } as React.CSSProperties}>
              {row.map((node) => (
                <div key={node.label} className="diagram-node">
                  <strong>{node.label}</strong>
                  {node.sub && <span>{node.sub}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {data.caption && <figcaption>{data.caption}</figcaption>}
    </figure>
  );
}
