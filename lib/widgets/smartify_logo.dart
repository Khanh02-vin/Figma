import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SmartifyLogo extends StatelessWidget {
  final bool isDark;
  final double size;
  final bool showText;

  const SmartifyLogo({
    super.key,
    this.isDark = false,
    this.size = 80,
    this.showText = false,
  });

  @override
  Widget build(BuildContext context) {
    final bgColor = isDark ? Colors.transparent : AppColors.primary;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Center(
            child: CustomPaint(
              size: Size(size * 0.8, size * 0.8),
              painter: _SmartifyLogoPainter(isDark: isDark),
            ),
          ),
        ),
        if (showText) ...[
          const SizedBox(height: 16),
          Text(
            'Smartify',
            style: TextStyle(
              fontSize: size * 0.28,
              fontWeight: FontWeight.w600,
              color: isDark ? Colors.white : AppColors.foreground,
              letterSpacing: -0.5,
            ),
          ),
        ],
      ],
    );
  }
}

class _SmartifyLogoPainter extends CustomPainter {
  final bool isDark;

  _SmartifyLogoPainter({this.isDark = false});

  @override
  void paint(Canvas canvas, Size size) {
    final color = isDark ? Colors.white : AppColors.primary;
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    final w = size.width;
    final h = size.height;

    // Wi-Fi waves
    final wavePaint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = w * 0.06
      ..strokeCap = StrokeCap.round;

    // Outer wave
    canvas.drawArc(
      Rect.fromCenter(center: Offset(w * 0.5, h * 0.5), width: w * 0.8, height: h * 0.8),
      0.8,
      -1.5,
      false,
      wavePaint,
    );

    // Middle wave
    canvas.drawArc(
      Rect.fromCenter(center: Offset(w * 0.5, h * 0.5), width: w * 0.5, height: h * 0.5),
      0.8,
      -1.0,
      false,
      wavePaint,
    );

    // Inner wave
    canvas.drawArc(
      Rect.fromCenter(center: Offset(w * 0.5, h * 0.5), width: w * 0.28, height: h * 0.28),
      0.8,
      -0.5,
      false,
      wavePaint,
    );

    // Center dot
    canvas.drawCircle(Offset(w * 0.5, h * 0.58), w * 0.06, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
