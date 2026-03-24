import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ScanDeviceScreen extends StatefulWidget {
  final VoidCallback onClose;
  final VoidCallback onManualEntry;

  const ScanDeviceScreen({
    super.key,
    required this.onClose,
    required this.onManualEntry,
  });

  @override
  State<ScanDeviceScreen> createState() => _ScanDeviceScreenState();
}

class _ScanDeviceScreenState extends State<ScanDeviceScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _scanController;

  @override
  void initState() {
    super.initState();
    _scanController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _scanController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Gradient background
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Color(0xFFFEF3C7), Color(0xFFFDE68A)],
              ),
            ),
          ),
          SafeArea(
            child: Column(
              children: [
                // Header
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      IconButton(
                        onPressed: widget.onClose,
                        icon: const Icon(Icons.close, size: 28),
                      ),
                      const Expanded(
                        child: Text(
                          'Scan Device',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w600,
                            color: AppColors.foreground,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: () {},
                        icon: const Icon(Icons.more_vert, size: 28),
                      ),
                    ],
                  ),
                ),
                // Scanner area
                Expanded(
                  child: Center(
                    child: SizedBox(
                      width: 288,
                      height: 288,
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          // Frame corners
                          ..._buildCorners(),
                          // Speaker illustration
                          SizedBox(
                            width: 160,
                            height: 192,
                            child: CustomPaint(
                              painter: _SpeakerIllustrationPainter(),
                            ),
                          ),
                          // QR Code
                          Container(
                            width: 96,
                            height: 96,
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.9),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: CustomPaint(
                              painter: _QRPainter(),
                            ),
                          ),
                          // Scan line
                          AnimatedBuilder(
                            animation: _scanController,
                            builder: (context, child) {
                              return Positioned(
                                top: 10 + _scanController.value * 248,
                                left: 16,
                                right: 16,
                                child: Container(
                                  height: 2,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      colors: [
                                        Colors.transparent,
                                        AppColors.primary,
                                        Colors.transparent,
                                      ],
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                // Footer
                Padding(
                  padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
                  child: Column(
                    children: [
                      const Text(
                        "Can't scan the QR code?",
                        style: TextStyle(
                          fontSize: 15,
                          color: AppColors.foreground,
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: widget.onManualEntry,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.foreground.withValues(alpha: 0.2),
                            foregroundColor: AppColors.foreground,
                            elevation: 0,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30),
                            ),
                          ),
                          child: const Text(
                            'Enter setup code manually',
                            style: TextStyle(fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      // Bottom controls
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _CircleButton(icon: Icons.remove, onTap: () {}),
                          const SizedBox(width: 24),
                          Container(
                            width: 64,
                            height: 64,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.1),
                                  blurRadius: 8,
                                ),
                              ],
                            ),
                            child: Center(
                              child: Container(
                                width: 56,
                                height: 56,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: AppColors.primary,
                                    width: 3,
                                  ),
                                ),
                                child: Padding(
                                  padding: const EdgeInsets.all(4),
                                  child: CircularProgressIndicator(
                                    valueColor: AlwaysStoppedAnimation(AppColors.primary),
                                    strokeWidth: 3,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 24),
                          _CircleButton(icon: Icons.person_outline, onTap: () {}),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildCorners() {
    const cornerSize = 48.0;
    const borderWidth = 4.0;
    final corners = [
      // top-left
      Positioned(
        top: 0,
        left: 0,
        child: Container(
          width: cornerSize,
          height: cornerSize,
          decoration: const BoxDecoration(
            border: Border(
              top: BorderSide(color: Colors.white, width: borderWidth),
              left: BorderSide(color: Colors.white, width: borderWidth),
            ),
            borderRadius: BorderRadius.only(topLeft: Radius.circular(16)),
          ),
        ),
      ),
      // top-right
      Positioned(
        top: 0,
        right: 0,
        child: Container(
          width: cornerSize,
          height: cornerSize,
          decoration: const BoxDecoration(
            border: Border(
              top: BorderSide(color: Colors.white, width: borderWidth),
              right: BorderSide(color: Colors.white, width: borderWidth),
            ),
            borderRadius: BorderRadius.only(topRight: Radius.circular(16)),
          ),
        ),
      ),
      // bottom-left
      Positioned(
        bottom: 0,
        left: 0,
        child: Container(
          width: cornerSize,
          height: cornerSize,
          decoration: const BoxDecoration(
            border: Border(
              bottom: BorderSide(color: Colors.white, width: borderWidth),
              left: BorderSide(color: Colors.white, width: borderWidth),
            ),
            borderRadius: BorderRadius.only(bottomLeft: Radius.circular(16)),
          ),
        ),
      ),
      // bottom-right
      Positioned(
        bottom: 0,
        right: 0,
        child: Container(
          width: cornerSize,
          height: cornerSize,
          decoration: const BoxDecoration(
            border: Border(
              bottom: BorderSide(color: Colors.white, width: borderWidth),
              right: BorderSide(color: Colors.white, width: borderWidth),
            ),
            borderRadius: BorderRadius.only(bottomRight: Radius.circular(16)),
          ),
        ),
      ),
    ];
    return corners;
  }
}

class _CircleButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;

  const _CircleButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 48,
        height: 48,
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.5),
          shape: BoxShape.circle,
        ),
        child: Icon(icon, size: 24, color: AppColors.foreground),
      ),
    );
  }
}

class _SpeakerIllustrationPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFFF3F4F6)
      ..style = PaintingStyle.fill;
    final strokePaint = Paint()
      ..color = const Color(0xFFE8E8E8)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    // Body
    final body = Path()
      ..addOval(Rect.fromLTWH(0, size.height * 0.2, size.width, size.height * 0.7));
    canvas.drawPath(body, paint);
    canvas.drawPath(body, strokePaint);

    // Top
    canvas.drawOval(
      Rect.fromLTWH(size.width * 0.1, size.height * 0.15, size.width * 0.8, size.height * 0.12),
      Paint()..color = const Color(0xFFE8E8E8),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _QRPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = Colors.black;
    final s = size.width;

    // Corner squares (finder patterns)
    canvas.drawRect(Rect.fromLTWH(0, 0, s * 0.3, s * 0.3), paint);
    canvas.drawRect(Rect.fromLTWH(s * 0.7, 0, s * 0.3, s * 0.3), paint);
    canvas.drawRect(Rect.fromLTWH(0, s * 0.7, s * 0.3, s * 0.3), paint);

    // Inner white of corners
    paint.color = Colors.white;
    canvas.drawRect(Rect.fromLTWH(s * 0.05, s * 0.05, s * 0.2, s * 0.2), paint);
    canvas.drawRect(Rect.fromLTWH(s * 0.75, s * 0.05, s * 0.2, s * 0.2), paint);
    canvas.drawRect(Rect.fromLTWH(s * 0.05, s * 0.75, s * 0.2, s * 0.2), paint);

    // Inner black of corners
    paint.color = Colors.black;
    canvas.drawRect(Rect.fromLTWH(s * 0.1, s * 0.1, s * 0.1, s * 0.1), paint);
    canvas.drawRect(Rect.fromLTWH(s * 0.8, s * 0.1, s * 0.1, s * 0.1), paint);
    canvas.drawRect(Rect.fromLTWH(s * 0.1, s * 0.8, s * 0.1, s * 0.1), paint);

    // Data bits
    paint.color = Colors.black;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if ((i + j) % 3 == 0) {
          canvas.drawRect(
            Rect.fromLTWH(s * 0.35 + i * s * 0.04, s * 0.35 + j * s * 0.04, s * 0.035, s * 0.035),
            paint,
          );
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
