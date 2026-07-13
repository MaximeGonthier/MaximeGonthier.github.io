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
    background: #1a73e8;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background 0.2s;
  }
  .resume-btn:hover { background: #0b57c0; color: #fff; }
  .resume-btn.secondary {
    background: transparent;
    color: #1a73e8;
    border: 1px solid #1a73e8;
  }
  .resume-btn.secondary:hover { background: rgba(26,115,232,0.08); color: #0b57c0; }
  .resume-viewer {
    width: 100%;
    height: 85vh;
    min-height: 500px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
</style>

<h1 style="margin:0px; font-size: 36px">Resume</h1>

<div class="resume-actions">
  <a class="resume-btn" href="/CV_july_2026.pdf" download>⬇ Download PDF</a>
  <a class="resume-btn secondary" href="/CV_july_2026.pdf" target="_blank" rel="noopener">Open in new tab</a>
</div>

<object class="resume-viewer" data="/CV_july_2026.pdf#view=FitH" type="application/pdf">
  <iframe class="resume-viewer" src="/CV_july_2026.pdf#view=FitH" title="Resume PDF"></iframe>
  <p>Your browser can't display the embedded PDF.
     <a href="/CV_july_2026.pdf" download>Download it instead</a>.</p>
</object>