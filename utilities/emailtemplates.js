export const generateVerificationEmail = (name, userId) => {
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Aloura - Verify Your Account</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="fragrance" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23fragrance)"/></svg>');
            opacity: 0.3;
          }
          
          .logo {
            font-family: 'Bebas Neue', cursive;
            font-size: 48px;
            color: #ffffff;
            letter-spacing: 4px;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
          }
          
          .tagline {
            color: #cccccc;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            z-index: 2;
          }
          
          .content {
            padding: 50px 30px;
            text-align: center;
          }
          
          .welcome-title {
            font-size: 28px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 20px;
          }
          
          .welcome-text {
            font-size: 16px;
            color: #666666;
            margin-bottom: 30px;
            line-height: 1.7;
          }
          
          .fragrance-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 30px 0;
            gap: 15px;
          }
          
          .fragrance-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #666666;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #ffffff;
            padding: 18px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            margin: 20px 0;
          }
          
          .verify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            color: #ffffff;
            text-decoration: none;
          }
          
          .benefits {
            background-color: #f8f9fa;
            padding: 30px;
            margin: 40px 0 0 0;
            border-radius: 10px;
          }
          
          .benefits-title {
            font-size: 20px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 20px;
          }
          
          .benefit-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            text-align: left;
          }
          
          .benefit-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: #ffffff;
            font-size: 12px;
            flex-shrink: 0;
          }
          
          .benefit-text {
            color: #666666;
            font-size: 14px;
          }
          
          .footer {
            background-color: #1a1a1a;
            color: #cccccc;
            padding: 30px;
            text-align: center;
            font-size: 12px;
          }
          
          .footer-text {
            margin-bottom: 10px;
          }
          
          .social-links {
            margin-top: 20px;
          }
          
          .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #cccccc;
            text-decoration: none;
            font-size: 16px;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e0e0e0 50%, transparent 100%);
            margin: 30px 0;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 0;
              box-shadow: none;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .logo {
              font-size: 36px;
            }
            
            .welcome-title {
              font-size: 24px;
            }
            
            .verify-button {
              padding: 15px 30px;
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="header">
            <div class="logo">ALOURA</div>
            <div class="tagline">Unlock the Power of Scent</div>
          </div>
          
          <!-- Main Content -->
          <div class="content">
            <h1 class="welcome-title">Welcome to Aloura, ${name}!</h1>
            
            <p class="welcome-text">
              Thank you for joining our exclusive fragrance community. You're about to embark on 
              a captivating journey where luxury meets artistry, and every scent tells a story.
            </p>
            
            <div class="fragrance-icons">
              <div class="fragrance-icon">🌸</div>
              <div class="fragrance-icon">✨</div>
              <div class="fragrance-icon">🎭</div>
            </div>
            
            <p class="welcome-text">
              To complete your account setup and unlock access to our curated collection 
              of premium fragrances, please verify your email address.
            </p>
            
            <a href="http://localhost:3000/api/auth/verify/${userId}" class="verify-button">
              Verify Your Account
            </a>
            
            <div class="divider"></div>
            
            <div class="benefits">
              <h3 class="benefits-title">What Awaits You</h3>
              
              <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">
                  <strong>Personalized Fragrance Quiz</strong> - Discover scents that match your unique personality
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">
                  <strong>Exclusive Access</strong> - Be the first to experience new arrivals and limited editions
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">
                  <strong>Expert Curation</strong> - Handpicked fragrances from renowned perfumers worldwide
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">
                  <strong>Member Rewards</strong> - Special discounts and loyalty benefits for verified members
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p class="footer-text">
              If you didn't create an account with Aloura, please ignore this email.
            </p>
            <p class="footer-text">
              Need help? Contact our fragrance specialists at support@aloura.com
            </p>
            
            <div class="social-links">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">Instagram</a>
              <a href="#" class="social-link">Twitter</a>
            </div>
            
            <p class="footer-text" style="margin-top: 20px; opacity: 0.7;">
              © 2025 Aloura. All rights reserved.<br>
              Crafting luxury fragrances for the distinguished individual.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};