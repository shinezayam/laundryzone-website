import { test, expect } from '@playwright/test';

test.describe('Video Autoplay Debug', () => {
  test('Test video autoplay policies', async ({ page }) => {
    // Test with different autoplay policies
    console.log('Testing video with strict autoplay policy...');
    
    // Set autoplay policy to blocked
    const context = await page.context();
    await context.grantPermissions(['autoplay-media']);
    
    // Enable console logging
    page.on('console', (msg) => {
      console.log(`Browser Console [${msg.type()}]: ${msg.text()}`);
    });

    await page.goto('http://localhost:3001/mn');
    await page.waitForLoadState('networkidle');
    
    // Scroll to video
    await page.locator('section:has(video)').scrollIntoViewIfNeeded();
    
    // Check if video starts playing automatically (it shouldn't due to muted=false)
    await page.waitForTimeout(3000);
    
    const autoplayStatus = await page.evaluate(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      return {
        paused: video?.paused,
        muted: video?.muted,
        autoplay: video?.autoplay,
        hasAttribute: video?.hasAttribute('autoplay')
      };
    });
    
    console.log('Autoplay status:', JSON.stringify(autoplayStatus, null, 2));
    
    // Test if clicking play button works (user gesture required)
    const playButton = page.locator('button[aria-label="Play video"]');
    if (await playButton.isVisible()) {
      console.log('Clicking play button with user gesture...');
      await playButton.click();
      
      await page.waitForTimeout(2000);
      
      const playResult = await page.evaluate(() => {
        const video = document.querySelector('video') as HTMLVideoElement;
        return {
          paused: video?.paused,
          currentTime: video?.currentTime,
          duration: video?.duration
        };
      });
      
      console.log('Play result after user gesture:', JSON.stringify(playResult, null, 2));
    }
  });
  
  test('Test muted autoplay', async ({ page }) => {
    console.log('Testing muted video autoplay...');
    
    page.on('console', (msg) => {
      console.log(`Browser Console [${msg.type()}]: ${msg.text()}`);
    });

    await page.goto('http://localhost:3001/mn');
    await page.waitForLoadState('networkidle');
    
    // Modify video to be muted for autoplay test
    await page.evaluate(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      if (video) {
        video.muted = true;
        video.autoplay = true;
        video.load(); // Reload with new attributes
      }
    });
    
    await page.waitForTimeout(3000);
    
    const mutedAutoplayResult = await page.evaluate(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      return {
        paused: video?.paused,
        muted: video?.muted,
        currentTime: video?.currentTime
      };
    });
    
    console.log('Muted autoplay result:', JSON.stringify(mutedAutoplayResult, null, 2));
  });
});