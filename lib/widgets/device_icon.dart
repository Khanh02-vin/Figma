import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class DeviceIcon extends StatelessWidget {
  final String type;
  final double size;

  const DeviceIcon({super.key, required this.type, this.size = 48});

  @override
  Widget build(BuildContext context) {
    switch (type) {
      case 'lamp':
        return _buildLamp();
      case 'cctv':
        return _buildCctv();
      case 'speaker':
        return _buildSpeaker();
      case 'router':
        return _buildRouter();
      case 'ac':
        return _buildAc();
      case 'webcam':
        return _buildWebcam();
      default:
        return Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            color: AppColors.muted,
            borderRadius: BorderRadius.circular(12),
          ),
        );
    }
  }

  Widget _buildLamp() {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _LampPainter(),
      ),
    );
  }

  Widget _buildCctv() {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _CctvPainter(),
      ),
    );
  }

  Widget _buildSpeaker() {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _SpeakerPainter(),
      ),
    );
  }

  Widget _buildRouter() {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _RouterPainter(),
      ),
    );
  }

  Widget _buildAc() {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _AcPainter(),
      ),
    );
  }

  Widget _buildWebcam() {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _WebcamPainter(),
      ),
    );
  }
}

class _LampPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFFF3F4F6)
      ..style = PaintingStyle.fill;

    final strokePaint = Paint()
      ..color = const Color(0xFFE5E7EB)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5;

    // Bulb
    final w = size.width;
    final h = size.height;

    // Base
    canvas.drawRect(
      Rect.fromLTWH(w * 0.35, h * 0.7, w * 0.3, h * 0.15),
      Paint()..color = const Color(0xFF9CA3AF),
    );
    canvas.drawRect(
      Rect.fromLTWH(w * 0.3, h * 0.82, w * 0.4, h * 0.1),
      Paint()..color = const Color(0xFF9CA3AF),
    );

    // Bulb shape
    final path = Path()
      ..moveTo(w * 0.2, h * 0.2)
      ..quadraticBezierTo(w * 0.1, h * 0.5, w * 0.35, h * 0.7)
      ..lineTo(w * 0.65, h * 0.7)
      ..quadraticBezierTo(w * 0.9, h * 0.5, w * 0.8, h * 0.2)
      ..close();

    canvas.drawPath(path, paint);
    canvas.drawPath(path, strokePaint);

    // Top cap
    canvas.drawOval(
      Rect.fromLTWH(w * 0.2, h * 0.12, w * 0.6, h * 0.12),
      Paint()..color = const Color(0xFFE5E7EB),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _CctvPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // Camera body
    canvas.drawCircle(
      Offset(w * 0.45, h * 0.45),
      w * 0.3,
      Paint()..color = const Color(0xFFF3F4F6),
    );
    canvas.drawCircle(
      Offset(w * 0.45, h * 0.45),
      w * 0.3,
      Paint()
        ..color = const Color(0xFFE5E7EB)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1.5,
    );

    // Lens
    canvas.drawCircle(
      Offset(w * 0.45, h * 0.45),
      w * 0.15,
      Paint()..color = const Color(0xFF1F2937),
    );
    canvas.drawCircle(
      Offset(w * 0.45, h * 0.45),
      w * 0.08,
      Paint()..color = const Color(0xFF374151),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _SpeakerPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // Body
    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(w * 0.2, h * 0.25, w * 0.6, h * 0.55),
      const Radius.circular(8),
    );
    canvas.drawRRect(rrect, Paint()..color = const Color(0xFFF3F4F6));
    canvas.drawRRect(
      rrect,
      Paint()
        ..color = const Color(0xFFE5E7EB)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1,
    );

    // Top grill
    canvas.drawOval(
      Rect.fromLTWH(w * 0.22, h * 0.2, w * 0.56, h * 0.12),
      Paint()..color = const Color(0xFFE5E7EB),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _RouterPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // Body
    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(w * 0.15, h * 0.45, w * 0.7, h * 0.3),
      const Radius.circular(4),
    );
    canvas.drawRRect(rrect, Paint()..color = const Color(0xFFF3F4F6));
    canvas.drawRRect(
      rrect,
      Paint()
        ..color = const Color(0xFFE5E7EB)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1,
    );

    // Antennae
    final antPaint = Paint()
      ..color = const Color(0xFF9CA3AF)
      ..strokeWidth = 2
      ..strokeCap = StrokeCap.round;

    canvas.drawLine(Offset(w * 0.3, h * 0.45), Offset(w * 0.25, h * 0.2), antPaint);
    canvas.drawLine(Offset(w * 0.5, h * 0.45), Offset(w * 0.5, h * 0.15), antPaint);
    canvas.drawLine(Offset(w * 0.7, h * 0.45), Offset(w * 0.75, h * 0.2), antPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _AcPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(w * 0.1, h * 0.35, w * 0.8, h * 0.35),
      const Radius.circular(4),
    );
    canvas.drawRRect(rrect, Paint()..color = const Color(0xFFF3F4F6));
    canvas.drawRRect(
      rrect,
      Paint()
        ..color = const Color(0xFFE5E7EB)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1,
    );

    // Vents
    final ventPaint = Paint()
      ..color = const Color(0xFFD1D5DB)
      ..strokeWidth = 1;

    for (var i = 0; i < 4; i++) {
      final y = h * 0.58 + i * (h * 0.05);
      canvas.drawLine(Offset(w * 0.2, y), Offset(w * 0.8, y), ventPaint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _WebcamPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // Lens
    canvas.drawCircle(
      Offset(w * 0.5, h * 0.38),
      w * 0.25,
      Paint()..color = const Color(0xFFF3F4F6),
    );
    canvas.drawCircle(
      Offset(w * 0.5, h * 0.38),
      w * 0.25,
      Paint()
        ..color = const Color(0xFFE5E7EB)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1,
    );

    canvas.drawCircle(
      Offset(w * 0.5, h * 0.38),
      w * 0.12,
      Paint()..color = const Color(0xFF1F2937),
    );

    // Stand
    canvas.drawRect(
      Rect.fromLTWH(w * 0.38, h * 0.62, w * 0.24, h * 0.2),
      Paint()..color = const Color(0xFFE5E7EB),
    );
    canvas.drawRect(
      Rect.fromLTWH(w * 0.28, h * 0.78, w * 0.44, h * 0.06),
      Paint()..color = const Color(0xFFD1D5DB),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
