import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/smartify_logo.dart';
import '../widgets/loading_spinner.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primary,
      body: SafeArea(
        child: Column(
          children: [
            const Expanded(
              child: Center(
                child: SmartifyLogo(isDark: true, size: 96, showText: true),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(bottom: 40),
              child: LoadingSpinner(isDark: true, size: 48),
            ),
          ],
        ),
      ),
    );
  }
}
