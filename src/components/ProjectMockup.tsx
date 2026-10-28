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
            <span className="pos-tax">Incl. GST (5%): ₹7.92</span>
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
          <span className="window-title">Offline Medical Search (450,000+ products)</span>
          <span className="window-badge latency-pill">⚡ ~110 ms typical</span>
        </div>
        <div className="mockup-search-body">
          <div className="mockup-search-bar">
            <span className="search-icon">🔍</span>
            <span className="search-input-text">krosin <span className="cursor-blink">|</span></span>
            <span className="search-tag">Sounds like: KRSN</span>
          </div>
          <div className="mockup-search-results">
            <div className="search-result-item active">
              <div className="search-res-title">Crocin DS Syrup</div>
              <div className="search-res-meta">
                <span className="match-score">Sounds-like match</span>
                <span className="stock-count">In stock</span>
              </div>
            </div>
            <div className="search-result-item">
              <div className="search-res-title">Crocin 650 Tablet</div>
              <div className="search-res-meta">
                <span className="match-score">Sounds-like match</span>
                <span className="stock-count">In stock</span>
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
          <span className="window-title">LAN Peer Sync (No Internet Required)</span>
          <span className="window-badge sync-pill">● Team project · in testing</span>
        </div>
        <div className="mockup-sync-body">
          <div className="sync-nodes-grid">
            <div className="sync-node">
              <div className="node-icon">🖥️</div>
              <div className="node-name">Counter 01</div>
              <div className="node-status">Peer</div>
              <div className="node-db">Local MongoDB</div>
            </div>
            <div className="sync-channel">
              <div className="sync-line"></div>
              <div className="sync-pulse"></div>
              <span className="sync-protocol">mDNS discovery · 1 s batches over HTTP</span>
            </div>
            <div className="sync-node">
              <div className="node-icon">💻</div>
              <div className="node-name">Counter 02</div>
              <div className="node-status">Peer</div>
              <div className="node-db">Local MongoDB</div>
            </div>
          </div>
          <div className="sync-status-bar">
            <span>Echo guard: origin counter + recent IDs + sync marker</span>
            <span className="sync-uptime">Heartbeat 60 s</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "premium-features-payments") {
    return (
      <div className="mockup-window" aria-hidden="true">
        <div className="window-chrome">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="window-title">Premium Purchase · Payment Fulfilment</span>
          <span className="window-badge pipeline-pill">Exactly once</span>
        </div>
        <div className="mockup-pipeline-body">
          <div className="pipeline-steps">
            <div className="pipe-step">
              <span className="pipe-icon">💳</span>
              <span className="pipe-name">Paid on Pinelab</span>
              <span className="pipe-sub">callback · poll · reconcile</span>
            </div>
            <span className="pipe-arrow">➔</span>
            <div className="pipe-step">
              <span className="pipe-icon">🔒</span>
              <span className="pipe-name">Atomic claim</span>
              <span className="pipe-sub">only one caller wins</span>
            </div>
            <span className="pipe-arrow">➔</span>
            <div className="pipe-step active">
              <span className="pipe-icon">✅</span>
              <span className="pipe-name">Feature unlocked</span>
              <span className="pipe-sub">every store, pushed live</span>
            </div>
          </div>
          <div className="pipeline-footer">
            <span>Duplicate callbacks, crashes and races: never charged twice, never lost</span>
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
          <span className="window-badge fps-pill">⌨ Keyboard-first</span>
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
              <span className="kb-num">F2</span>
              <span>Medicine search from any screen</span>
            </div>
            <div className="kb-metric-badge">
              <span className="kb-num">Esc</span>
              <span>Closes any dialog, no mouse needed</span>
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
            <span>The pharmacist reviews the draft purchase, then confirms</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
