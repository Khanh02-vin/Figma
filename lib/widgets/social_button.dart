import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SocialButton extends StatelessWidget {
  final String provider;
  final VoidCallback? onTap;

  const SocialButton({
    super.key,
    required this.provider,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(30),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(30),
        child: Container(
          height: 56,
          decoration: BoxDecoration(
            border: Border.all(color: AppColors.border),
            borderRadius: BorderRadius.circular(30),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildIcon(),
              const SizedBox(width: 12),
              Text(
                _label,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: AppColors.foreground,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildIcon() {
    switch (provider) {
      case 'google':
        return SizedBox(
          width: 24,
          height: 24,
          child: Image.network(
            'https://www.google.com/favicon.ico',
            errorBuilder: (_, __, ___) => const Icon(Icons.circle, color: Colors.red, size: 24),
          ),
        );
      case 'apple':
        return const Icon(Icons.apple, size: 24, color: Colors.black);
      case 'facebook':
        return const Icon(Icons.facebook, size: 24, color: Color(0xFF1877F2));
      case 'twitter':
        return const Icon(Icons.alternate_email, size: 24, color: Color(0xFF1DA1F2));
      default:
        return const SizedBox.shrink();
    }
  }

  String get _label {
    switch (provider) {
      case 'google':
        return 'Continue with Google';
      case 'apple':
        return 'Continue with Apple';
      case 'facebook':
        return 'Continue with Facebook';
      case 'twitter':
        return 'Continue with Twitter';
      default:
        return '';
    }
  }
}
