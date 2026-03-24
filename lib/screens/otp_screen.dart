import 'dart:async';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class OtpScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onVerify;

  const OtpScreen({
    super.key,
    required this.onBack,
    required this.onVerify,
  });

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final List<TextEditingController> _controllers =
      List.generate(4, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(4, (_) => FocusNode());
  int _countdown = 56;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startCountdown();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _focusNodes[0].requestFocus();
    });
  }

  void _startCountdown() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_countdown > 0) {
        setState(() => _countdown--);
      } else {
        timer.cancel();
      }
    });
  }

  void _onKeyTap(String key) {
    if (key == 'backspace') {
      final idx = _controllers.indexWhere((c) => c.text.isEmpty);
      final target = idx > 0 ? idx - 1 : 0;
      _controllers[target].clear();
      _focusNodes[target].requestFocus();
    } else {
      final idx = _controllers.indexWhere((c) => c.text.isEmpty);
      if (idx >= 0) {
        _controllers[idx].text = key;
        if (idx < 3) {
          _focusNodes[idx + 1].requestFocus();
        } else {
          if (_controllers.every((c) => c.text.isNotEmpty)) {
            Future.delayed(const Duration(milliseconds: 500), widget.onVerify);
          }
        }
      }
    }
  }

  void _handleResend() {
    if (_countdown == 0) {
      setState(() {
        _countdown = 60;
        for (var c in _controllers) {
          c.clear();
        }
      });
      _focusNodes[0].requestFocus();
      _startCountdown();
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (var c in _controllers) c.dispose();
    for (var f in _focusNodes) f.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  IconButton(
                    onPressed: widget.onBack,
                    icon: const Icon(Icons.arrow_back, size: 28),
                  ),
                ],
              ),
            ),
            // Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Enter OTP Code',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: AppColors.foreground,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Please check your email inbox for a message from Smartify. Enter the one-time verification code below.',
                      style: TextStyle(fontSize: 14, color: AppColors.mutedForeground, height: 1.5),
                    ),
                    const SizedBox(height: 32),
                    // OTP Inputs
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(4, (i) {
                        return Container(
                          width: 64,
                          height: 80,
                          margin: const EdgeInsets.symmetric(horizontal: 6),
                          decoration: BoxDecoration(
                            color: AppColors.muted.withValues(alpha: 0.3),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: _focusNodes[i].hasFocus
                                  ? AppColors.primary
                                  : AppColors.border,
                              width: 2,
                            ),
                          ),
                          child: TextField(
                            controller: _controllers[i],
                            focusNode: _focusNodes[i],
                            textAlign: TextAlign.center,
                            keyboardType: TextInputType.number,
                            maxLength: 1,
                            style: const TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.w600,
                            ),
                            decoration: const InputDecoration(
                              border: InputBorder.none,
                              counterText: '',
                            ),
                            onChanged: (val) {
                              if (val.isNotEmpty && i < 3) {
                                _focusNodes[i + 1].requestFocus();
                              }
                              if (_controllers.every((c) => c.text.isNotEmpty)) {
                                Future.delayed(const Duration(milliseconds: 500), widget.onVerify);
                              }
                            },
                          ),
                        );
                      }),
                    ),
                    const SizedBox(height: 24),
                    // Countdown
                    Center(
                      child: Text.rich(
                        TextSpan(
                          children: [
                            const TextSpan(
                              text: 'You can resend the code in ',
                              style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                            ),
                            TextSpan(
                              text: '$_countdown',
                              style: const TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                                color: AppColors.primary,
                              ),
                            ),
                            const TextSpan(
                              text: ' seconds',
                              style: TextStyle(fontSize: 13, color: AppColors.mutedForeground),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Center(
                      child: GestureDetector(
                        onTap: _handleResend,
                        child: Text(
                          'Resend code',
                          style: TextStyle(
                            fontSize: 13,
                            color: _countdown > 0
                                ? AppColors.mutedForeground.withValues(alpha: 0.5)
                                : AppColors.primary,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            // Numpad
            Container(
              padding: const EdgeInsets.all(16),
              color: AppColors.muted.withValues(alpha: 0.3),
              child: Column(
                children: [
                  for (var row in [
                    ['1', '2', '3'],
                    ['4', '5', '6'],
                    ['7', '8', '9'],
                    ['*', '0', '⌫'],
                  ])
                    Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        children: row.map((key) {
                          return Expanded(
                            child: GestureDetector(
                              onTap: () => _onKeyTap(key == '⌫' ? 'backspace' : key),
                              child: Container(
                                height: 56,
                                margin: const EdgeInsets.symmetric(horizontal: 4),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Center(
                                  child: key == '⌫'
                                      ? const Icon(Icons.backspace_outlined, size: 24)
                                      : Text(
                                          key,
                                          style: const TextStyle(
                                            fontSize: 24,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                ),
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
