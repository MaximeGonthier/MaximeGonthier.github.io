---
layout: page
title: Resume
permalink: /resume/
excerpt: Academic web page
does_not_need_title: true
---
<style>
  .resume-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    align-items: center;
    margin-bottom: 1rem;
  }
  .resume-btn {
    display: inline-block;
    padding: 0.55rem 1.1rem;
    background: var(--accent);
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background 0.2s;
  }
  .resume-btn:hover { background: var(--accent-hover); color: #fff; }
  .resume-btn.secondary {
    background: transparent;
    color: var(--accent);
    border: 1px solid var(--accent);
  }
  .resume-btn.secondary:hover { background: var(--accent-soft); color: var(--accent-hover); }
  .resume-viewer {
    width: 100%;
    height: 85vh;
    min-height: 500px;
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
</style>

<h1 style="margin:0px; font-size: 36px">Resume</h1>

<div class="resume-actions">
  <a class="resume-btn" href="/CV.pdf" download>⬇ Download PDF</a>
  <a class="resume-btn secondary" href="/CV.pdf" target="_blank" rel="noopener">Open in new tab</a>
</div>

<object class="resume-viewer" data="/CV.pdf#view=FitH" type="application/pdf">
  <iframe class="resume-viewer" src="/CV.pdf#view=FitH" title="Resume PDF"></iframe>
  <p>Your browser can't display the embedded PDF.
     <a href="/CV.pdf" download>Download it instead</a>.</p>
</object>
