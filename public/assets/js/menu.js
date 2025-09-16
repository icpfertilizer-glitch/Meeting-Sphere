// ui.js — เมนูเลื่อนข้าง + ซิงค์ชื่อผู้ใช้ + dropdown ภายในเมนู
(() => {
  // รันหลัง DOM โหลดเสร็จ (ซ้ำกับ defer ก็จริง แต่กันไว้เพื่อความชัวร์)
  document.addEventListener('DOMContentLoaded', () => {
    const menuBtn   = document.getElementById('menuFab');
    const menuClose = document.getElementById('menuClose');
    const menuOv    = document.getElementById('menuOverlay');

    // องค์ประกอบที่แสดงชื่อผู้ใช้ (บน navbar และในเมนู)
    const topUserEl = document.getElementById('userDisplayName');
    const sideUserEl = document.getElementById('menuUserName');
    const avatarEl = document.querySelector('.avatar-circle');

    // ----- utils -----
    function syncUserName() {
      if (!sideUserEl) return;
      const name = (topUserEl?.textContent || '').trim();
      const display = name || 'ผู้ใช้';
      sideUserEl.textContent = display;
      if (avatarEl) avatarEl.textContent = display.charAt(0).toUpperCase();
    }

    function openMenu() {
      if (!menuOv) return;
      menuOv.classList.add('show');
      document.documentElement.style.overflow = 'hidden';
      syncUserName();
    }

    function closeMenu() {
      if (!menuOv) return;
      menuOv.classList.remove('show');
      document.documentElement.style.overflow = '';
    }

    // ----- events: open/close -----
    menuBtn?.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // คลิกนอก drawer เพื่อปิด
    menuOv?.addEventListener('click', (e) => {
      if (!e.target.closest('.menu-drawer')) closeMenu();
    });

    // ----- dropdown ภายในเมนู (แบบ custom ไม่ใช่ Bootstrap collapse) -----
    // โครงสร้างคาดหวัง: <li class="menu-dropdown"><button class="menu-link">...</button><ul class="submenu">...</ul></li>
    document.querySelectorAll('.menu-dropdown > .menu-link').forEach((btn) => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.menu-dropdown');
        parent?.classList.toggle('open');
      });
    });

    // ถ้าชื่อผู้ใช้เปลี่ยนทีหลัง (เช่น หลัง auth), ใช้ MutationObserver อัปเดตให้เอง
    if (topUserEl) {
      const obs = new MutationObserver(syncUserName);
      obs.observe(topUserEl, { characterData: true, childList: true, subtree: true });
    }

    // ซิงค์ครั้งแรกเผื่อมีค่าแล้ว
    syncUserName();
  });
})();
