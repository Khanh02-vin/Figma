import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/smartify_logo.dart';
import '../widgets/social_button.dart';
import '../widgets/primary_button.dart';

class WelcomeScreen extends StatelessWidget {
  final VoidCallback onSignUp;
  final VoidCallback onSignIn;
  final Function(String) onSocialLogin;

  const WelcomeScreen({
    super.key,
    required this.onSignUp,
    required this.onSignIn,
    required this.onSocialLogin,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            children: [
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SmartifyLogo(isDark: false, size: 96),
                    const SizedBox(height: 32),
                    const Text(
                      "Let's Get Started!",
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: AppColors.foreground,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      "Let's dive in into your account",
                      style: TextStyle(
                        fontSize: 15,
                        color: AppColors.mutedForeground,
                      ),
                    ),
                  ],
                ),
              ),
              // Social buttons
              Column(
                children: [
                  SocialButton(provider: 'google', onTap: () => onSocialLogin('google')),
                  const SizedBox(height: 12),
                  SocialButton(provider: 'apple', onTap: () => onSocialLogin('apple')),
                  const SizedBox(height: 12),
                  SocialButton(provider: 'facebook', onTap: () => onSocialLogin('facebook')),
                  const SizedBox(height: 12),
                  SocialButton(provider: 'twitter', onTap: () => onSocialLogin('twitter')),
                ],
              ),
              const SizedBox(height: 24),
              // Sign up / Sign in
              PrimaryButton(label: 'Sign up', onTap: onSignUp),
              const SizedBox(height: 12),
              PrimaryButton(label: 'Sign in', isSecondary: true, onTap: onSignIn),
              const SizedBox(height: 24),
              // Footer links
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _FooterLink(label: 'Privacy Policy'),
                  const Text(' · ', style: TextStyle(color: AppColors.mutedForeground)),
                  _FooterLink(label: 'Terms of Service'),
                ],
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}

class _FooterLink extends StatelessWidget {
  final String label;
  const _FooterLink({required this.label});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {},
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 13,
          color: AppColors.mutedForeground,
        ),
      ),
    );
  }
}
