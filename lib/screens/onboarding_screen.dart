import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/data_constants.dart';
import '../widgets/primary_button.dart';
import '../widgets/page_indicator.dart';

class OnboardingScreen extends StatefulWidget {
  final VoidCallback onComplete;
  final VoidCallback onSkip;

  const OnboardingScreen({
    super.key,
    required this.onComplete,
    required this.onSkip,
  });

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  int _currentSlide = 0;

  void _nextSlide() {
    if (_currentSlide < onboardingSlides.length - 1) {
      setState(() => _currentSlide++);
    } else {
      widget.onComplete();
    }
  }

  @override
  Widget build(BuildContext context) {
    final slide = onboardingSlides[_currentSlide];
    final isLast = _currentSlide == onboardingSlides.length - 1;

    return Scaffold(
      backgroundColor: AppColors.primary,
      body: SafeArea(
        child: Column(
          children: [
            // Image area
            Expanded(
              flex: 3,
              child: Padding(
                padding: const EdgeInsets.only(top: 24),
                child: Center(
                  child: Image.network(
                    slide.imageUrl,
                    height: 420,
                    fit: BoxFit.contain,
                    errorBuilder: (_, __, ___) => Container(
                      width: 200,
                      height: 300,
                      color: AppColors.smartifyBlueLight,
                      child: const Center(
                        child: Icon(Icons.home, size: 80, color: AppColors.primary),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            // Content area
            Expanded(
              flex: 2,
              child: Container(
                width: double.infinity,
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(40),
                    topRight: Radius.circular(40),
                  ),
                ),
                padding: const EdgeInsets.fromLTRB(24, 32, 24, 24),
                child: Column(
                  children: [
                    Text(
                      slide.title,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: AppColors.foreground,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 12),
                    Text(
                      slide.description,
                      style: const TextStyle(
                        fontSize: 14,
                        color: AppColors.mutedForeground,
                        height: 1.5,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 24),
                    PageIndicator(
                      total: onboardingSlides.length,
                      current: _currentSlide,
                    ),
                    const SizedBox(height: 24),
                    Row(
                      children: [
                        Expanded(
                          child: PrimaryButton(
                            label: 'Skip',
                            isSecondary: true,
                            onTap: widget.onSkip,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: PrimaryButton(
                            label: isLast ? "Let's Get Started" : 'Continue',
                            onTap: _nextSlide,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
