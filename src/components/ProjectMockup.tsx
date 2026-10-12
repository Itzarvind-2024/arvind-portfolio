export function ProjectMockup({ slug }: { slug: string }) {
  if (slug === "offline-pharmacy-pos") {
    return (
      <div className="mockup-window" aria-hidden="true">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="window-title">Pharmacy POS — Counter 01 [OFFLINE ACTIVE]</span>
          <span className="window-badge offline-pill">● Local Engine Online</span>
        </div>
        <div className="mockup-pos-body">
          <div className="mockup-pos-tabs">
            <span className="pos-tab active">Bill #1042 (In Progress)</span>
            <span className="pos-tab parked">Bill #1041 (Parked)</span>
            <span className="pos-tab-add">+ F1 New</span>
          </div>
          <div className="mockup-pos-table">
            <div className="pos-row pos-header">
              <span>Item Description</span>
              <span>Batch</span>
              <span>Exp</span>
              <span>Qty</span>
              <span>Price</span>
            </div>
            <div className="pos-row">
              <span className="pos-item-name">Dolo 650mg Tab</span>
              <span className="pos-mono">DL892</span>
              <span className="pos-mono">08/27</span>
              <span>15</span>
              <span className="pos-price">₹47.25</span>
            </div>
            <div className="pos-row">
              <span className="pos-item-name">Azithral 500mg</span>
              <span className="pos-mono">AZ104</span>
              <span className="pos-mono">12/26</span>
              <span>1</span>
              <span className="pos-price">₹119.00</span>
            </div>
          </div>
          <div className="mockup-pos-footer">
            <span className="pos-tax">GST (12%): ₹19.95</span>
            <span className="pos-total">Total: <strong>₹166.25</strong></span>
            <span className="pos-btn-print">F8 Print 3" Thermal</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "medical-search-engine") {
    return (
      <div className="mockup-window" aria-hidden="true">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="window-title">In-Memory Medical Search (450,000+ items)</span>
          <span className="window-badge latency-pill">⚡ 3.2 ms latency</span>
        </div>
        <div className="mockup-search-body">
          <div className="mockup-search-bar">
            <span className="search-icon">🔍</span>
            <span className="search-input-text">paracitamol 650 <span className="cursor-blink">|</span></span>
            <span className="search-tag">Phonetic Fuzzy</span>
          </div>
          <div className="mockup-search-results">
            <div className="search-result-item active">
              <div className="search-res-title">Paracetamol 650mg (Dolo / Calpol)</div>
              <div className="search-res-meta">
                <span className="match-score">98% phonetic match</span>
                <span className="stock-count">In stock: 320 strips</span>
                <span className="rack-pos">Rack A-12</span>
              </div>
            </div>
            <div className="search-result-item">
              <div className="search-res-title">Paracetamol 500mg Tablets</div>
              <div className="search-res-meta">
                <span className="match-score">94% match</span>
                <span className="stock-count">In stock: 150 strips</span>
                <span className="rack-pos">Rack A-11</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "lan-peer-sync") {
    return (
      <div className="mockup-window" aria-hidden="true">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="window-title">LAN Peer Sync Protocol (No Internet Required)</span>
          <span className="window-badge sync-pill">● P2P Mesh Sync</span>
        </div>
        <div className="mockup-sync-body">
          <div className="sync-nodes-grid">
            <div className="sync-node">
              <div className="node-icon">🖥️</div>
              <div className="node-name">Counter 01</div>
              <div className="node-status">Master Node</div>
              <div className="node-db">MongoDB Replica</div>
            </div>
            <div className="sync-channel">
              <div className="sync-line"></div>
              <div className="sync-pulse"></div>
              <span className="sync-protocol">LAN Broadcast · Change Streams</span>
            </div>
            <div className="sync-node">
              <div className="node-icon">💻</div>
              <div className="node-name">Counter 02</div>
              <div className="node-status">Peer Node</div>
              <div className="node-db">Realtime Mirror</div>
            </div>
          </div>
          <div className="sync-status-bar">
            <span>Conflict Resolution: LWW + Invariant Validation</span>
            <span className="sync-uptime">Offline Uptime: 100%</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "keyboard-first-billing") {
    return (
      <div className="mockup-window" aria-hidden="true">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="window-title">React + Tauri Keyboard Desktop Engine</span>
          <span className="window-badge fps-pill">⚡ 60–120 FPS</span>
        </div>
        <div className="mockup-kb-body">
          <div className="kb-shortcuts-row">
            <div className="kb-key-card"><kbd>F1</kbd><span>New Bill</span></div>
            <div className="kb-key-card"><kbd>F2</kbd><span>Search</span></div>
            <div className="kb-key-card"><kbd>F4</kbd><span>Discount</span></div>
            <div className="kb-key-card"><kbd>Tab</kbd><span>Next</span></div>
            <div className="kb-key-card highlight"><kbd>F8</kbd><span>Print Bill</span></div>
          </div>
          <div className="kb-grid-preview">
            <div className="kb-metric-badge">
              <span className="kb-num">−40%</span>
              <span>Checkout time per customer</span>
            </div>
            <div className="kb-metric-badge">
              <span className="kb-num">0 ms</span>
              <span>Mouse-free transaction flow</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "supplier-bill-pipeline") {
    return (
      <div className="mockup-window" aria-hidden="true">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="window-title">Supplier Invoice Ingestion Pipeline</span>
          <span className="window-badge pipeline-pill">Auto-Ingest</span>
        </div>
        <div className="mockup-pipeline-body">
          <div className="pipeline-steps">
            <div className="pipe-step">
              <span className="pipe-icon">📄</span>
              <span className="pipe-name">PDF / Excel Invoice</span>
              <span className="pipe-sub">Distributor format</span>
            </div>
            <span className="pipe-arrow">➔</span>
            <div className="pipe-step">
              <span className="pipe-icon">⚙️</span>
              <span className="pipe-name">Parser & Normalizer</span>
              <span className="pipe-sub">Extract batches, taxes</span>
            </div>
            <span className="pipe-arrow">➔</span>
            <div className="pipe-step active">
              <span className="pipe-icon">📦</span>
              <span className="pipe-name">Live Inventory</span>
              <span className="pipe-sub">Instant bulk upsert</span>
            </div>
          </div>
          <div className="pipeline-footer">
            <span>Result: 300+ items ingested & verified in &lt; 5 seconds</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
