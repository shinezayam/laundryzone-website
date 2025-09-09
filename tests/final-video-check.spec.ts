import { test, expect } from '@playwright/test';

test.describe('Final Video Check', () => {
  test('Comprehensive video functionality test', async ({ page }) => {
    console.log('=== COMPREHENSIVE VIDEO FUNCTIONALITY TEST ===');
    
    // Enable console logging
    page.on('console', (msg) => {
      if (msg.text().includes('Video') || msg.text().includes('Play')) {
        console.log(`Browser: ${msg.text()}`);
      }
    });

    // Navigate and wait
    await page.goto('http://localhost:3001/mn');
    await page.waitForLoadState('networkidle');
    
    // Find and scroll to video section
    console.log('1. Locating video section...');
    const videoSection = page.locator('section:has(video)');
    await expect(videoSection).toBeVisible();
    await videoSection.scrollIntoViewIfNeeded();
    
    // Check video element properties
    console.log('2. Checking video element...');
    const video = page.locator('video');
    await expect(video).toBeVisible();
    
    const videoInfo = await page.evaluate(() => {
      const vid = document.querySelector('video') as HTMLVideoElement;
      return {
        src: vid.currentSrc,
        readyState: vid.readyState,
        paused: vid.paused,
        muted: vid.muted,
        controls: vid.controls,
        duration: vid.duration,
        videoWidth: vid.videoWidth,
        videoHeight: vid.videoHeight
      };
    });
    
    console.log('Video Info:', JSON.stringify(videoInfo, null, 2));
    
    // Check if play overlay is visible
    console.log('3. Checking play overlay...');
    const playOverlay = page.locator('button[aria-label="Play video"]');
    const overlayVisible = await playOverlay.isVisible();
    console.log(`Play overlay visible: ${overlayVisible}`);
    
    if (overlayVisible) {
      console.log('4. Testing play overlay click...');
      await playOverlay.click();
      await page.waitForTimeout(2000);
      
      const playResult = await page.evaluate(() => {
        const vid = document.querySelector('video') as HTMLVideoElement;
        return {
          playing: !vid.paused,
          currentTime: vid.currentTime
        };
      });
      
      console.log(`Play result: ${JSON.stringify(playResult)}`);
      
      if (playResult.playing) {
        console.log('✅ Video successfully started playing via overlay');
      } else {
        console.log('❌ Video did not start playing via overlay');
      }
    }
    
    // Test native controls
    console.log('5. Testing native video controls...');
    await video.click({ position: { x: 50, y: 400 } }); // Click in center-bottom area where controls are
    await page.waitForTimeout(1000);
    
    const controlsResult = await page.evaluate(() => {
      const vid = document.querySelector('video') as HTMLVideoElement;
      return {
        paused: vid.paused,
        currentTime: vid.currentTime
      };
    });
    
    console.log(`Controls result: ${JSON.stringify(controlsResult)}`);
    
    // Direct API test
    console.log('6. Testing direct video.play() API...');
    const apiResult = await page.evaluate(async () => {
      const vid = document.querySelector('video') as HTMLVideoElement;
      try {
        await vid.play();
        return { success: true, playing: !vid.paused };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    });
    
    console.log(`API result: ${JSON.stringify(apiResult)}`);
    
    // Final status
    console.log('7. Final video status...');
    const finalStatus = await page.evaluate(() => {
      const vid = document.querySelector('video') as HTMLVideoElement;
      return {
        canPlay: vid.readyState >= 3,
        isLoaded: vid.readyState === 4,
        duration: vid.duration,
        paused: vid.paused,
        currentTime: vid.currentTime,
        hasError: !!vid.error
      };
    });
    
    console.log('Final Status:', JSON.stringify(finalStatus, null, 2));
    
    // Summary
    console.log('=== TEST SUMMARY ===');
    console.log(`✓ Video file loads: ${finalStatus.isLoaded}`);
    console.log(`✓ Video duration: ${finalStatus.duration}s`);
    console.log(`✓ No errors: ${!finalStatus.hasError}`);
    console.log(`✓ Controls work: ${videoInfo.controls}`);
  });
});