import { test, expect } from '@playwright/test';

test.describe('Video Player Debug', () => {
  test('Debug FacebookReelEmbed video player', async ({ page }) => {
    // Enable console logging
    page.on('console', (msg) => {
      console.log(`Browser Console [${msg.type()}]: ${msg.text()}`);
    });

    // Listen for errors
    page.on('pageerror', (error) => {
      console.error(`Page Error: ${error.message}`);
    });

    // Navigate to the page
    console.log('1. Navigating to http://localhost:3001/mn');
    await page.goto('http://localhost:3001/mn');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Scroll to the video section
    console.log('2. Scrolling to video section');
    await page.locator('section:has(video)').scrollIntoViewIfNeeded();
    
    // Wait a bit for the video section to be visible
    await page.waitForTimeout(2000);
    
    // Take a screenshot of the video section
    await page.locator('section:has(video)').screenshot({ 
      path: 'video-section-debug.png' 
    });
    
    // 2. Locate the video element
    console.log('3. Locating video element');
    const videoElement = page.locator('video');
    await expect(videoElement).toBeVisible();
    
    // Check video source
    const videoSrc = await videoElement.getAttribute('src');
    const videoSources = await page.locator('video source').count();
    console.log(`Video src attribute: ${videoSrc}`);
    console.log(`Number of source elements: ${videoSources}`);
    
    if (videoSources > 0) {
      const sourceSrc = await page.locator('video source').first().getAttribute('src');
      console.log(`Source src: ${sourceSrc}`);
    }
    
    // 3. Check if video loads properly
    console.log('4. Checking video load state');
    const videoProperties = await page.evaluate(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      if (!video) return null;
      
      return {
        readyState: video.readyState,
        networkState: video.networkState,
        paused: video.paused,
        currentSrc: video.currentSrc,
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        error: video.error ? {
          code: video.error.code,
          message: video.error.message
        } : null
      };
    });
    
    console.log('Video properties:', JSON.stringify(videoProperties, null, 2));
    
    // Wait for video to be ready
    try {
      await page.waitForFunction(() => {
        const video = document.querySelector('video') as HTMLVideoElement;
        return video && video.readyState >= 2; // HAVE_CURRENT_DATA
      }, { timeout: 10000 });
      console.log('Video is ready to play');
    } catch (error) {
      console.log('Video did not reach ready state within 10 seconds');
    }
    
    // 4. Try clicking the play button overlay
    console.log('5. Looking for play button overlay');
    const playButton = page.locator('button[aria-label="Play video"]');
    
    if (await playButton.isVisible()) {
      console.log('Play button overlay found, clicking...');
      await playButton.click();
      
      // Wait for video to start playing
      await page.waitForTimeout(2000);
      
      // Check if video is now playing
      const isPlayingAfterClick = await page.evaluate(() => {
        const video = document.querySelector('video') as HTMLVideoElement;
        return video ? !video.paused : false;
      });
      
      console.log(`Video playing after click: ${isPlayingAfterClick}`);
    } else {
      console.log('Play button overlay not visible');
    }
    
    // 5. Check console logs for video-related messages
    console.log('6. Checking for any additional console messages (already captured above)');
    
    // 6. Test the video element's play() method directly
    console.log('7. Testing video.play() method directly');
    const playResult = await page.evaluate(async () => {
      const video = document.querySelector('video') as HTMLVideoElement;
      if (!video) return { error: 'Video element not found' };
      
      try {
        const playPromise = video.play();
        await playPromise;
        return { 
          success: true, 
          paused: video.paused,
          currentTime: video.currentTime,
          readyState: video.readyState
        };
      } catch (error) {
        return { 
          error: error instanceof Error ? error.message : 'Unknown error',
          paused: video.paused,
          readyState: video.readyState
        };
      }
    });
    
    console.log('Direct play() result:', JSON.stringify(playResult, null, 2));
    
    // Check if video has native controls
    const hasControls = await videoElement.getAttribute('controls');
    console.log(`Video has native controls: ${hasControls !== null}`);
    
    // Try clicking on the video itself (native controls)
    console.log('8. Trying to click on video native controls');
    await videoElement.click({ position: { x: 50, y: 50 } });
    await page.waitForTimeout(1000);
    
    const finalVideoState = await page.evaluate(() => {
      const video = document.querySelector('video') as HTMLVideoElement;
      return video ? {
        paused: video.paused,
        currentTime: video.currentTime,
        readyState: video.readyState,
        networkState: video.networkState
      } : null;
    });
    
    console.log('Final video state:', JSON.stringify(finalVideoState, null, 2));
    
    // Test network request for the video
    console.log('9. Testing direct video file access');
    const videoResponse = await page.request.get('http://localhost:3001/videos/laundryzone-reel.mp4');
    console.log(`Video file response status: ${videoResponse.status()}`);
    console.log(`Video file content-type: ${videoResponse.headers()['content-type']}`);
    console.log(`Video file content-length: ${videoResponse.headers()['content-length']}`);
    
    // Take a final screenshot
    await page.screenshot({ path: 'final-debug-state.png', fullPage: true });
  });
});