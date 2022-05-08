import UIKit
import SceneKit
import ARKit

@objc(ViewController)
class ViewController: UIViewController, ARSCNViewDelegate {

    @IBOutlet var sceneView: ARSCNView!
    var grids = [Grid]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        createButton()
        // Set the view's delegate
        sceneView.delegate = self
        
        // Show statistics such as fps and timing information
        sceneView.showsStatistics = true
        sceneView.debugOptions = ARSCNDebugOptions.showFeaturePoints
        
        // Create a new scene
        let scene = SCNScene()

        // Set the scene to the view
        sceneView.scene = scene
        
        let gestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(tapped))
        sceneView.addGestureRecognizer(gestureRecognizer)
        
        let gestureLongRecognizer = UILongPressGestureRecognizer(target: self, action: #selector(handleLongPress))
        sceneView.addGestureRecognizer(gestureLongRecognizer)
    }
    
    @objc func toggleTorch(sender: UIButton!) {
            guard
                let device = AVCaptureDevice.default(for: AVMediaType.video),
                device.hasTorch
            else { return }

            do {
                try device.lockForConfiguration()
                if device.torchMode == AVCaptureDevice.TorchMode.on
                {
                    device.torchMode = .off
                    
                } else {
                    device.torchMode = .on
                    
                }
                device.unlockForConfiguration()
            } catch {
                print("Torch could not be used")
            }
    }
    
    func createButton(){
        let button = UIButton(frame: CGRect(x: 20, y: 60, width: 70, height: 25))
        if #available(iOS 15.0, *){
            button.configuration = createConfig()
        }
        button.setTitle("Flash", for: .normal)
        button.setTitleColor(UIColor.white, for: .normal)
        button.addTarget(self, action: #selector(toggleTorch), for: .touchUpInside)
        view.addSubview(button)
    }
    
    @available(iOS 15.0, *)
    func createConfig() -> UIButton.Configuration{
        let config: UIButton.Configuration = .gray()
        return config
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        // Create a session configuration
        let configuration = ARWorldTrackingConfiguration()
        configuration.planeDetection = .vertical

        // Run the view's session
        sceneView.session.run(configuration)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        // Pause the view's session
        sceneView.session.pause()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Release any cached data, images, etc that aren't in use.
    }

    // MARK: - ARSCNViewDelegate
    
/*
    // Override to create and configure nodes for anchors added to the view's session.
    func renderer(_ renderer: SCNSceneRenderer, nodeFor anchor: ARAnchor) -> SCNNode? {
        let node = SCNNode()
     
        return node
    }
*/
    
    func session(_ session: ARSession, didFailWithError error: Error) {
        // Present an error message to the user
        
    }
    
    func sessionWasInterrupted(_ session: ARSession) {
        // Inform the user that the session has been interrupted, for example, by presenting an overlay
        
    }
    
    func sessionInterruptionEnded(_ session: ARSession) {
        // Reset tracking and/or remove existing anchors if consistent tracking is required
        
    }
    
    func renderer(_ renderer: SCNSceneRenderer, didAdd node: SCNNode, for anchor: ARAnchor) {
        guard let planeAnchor = anchor as? ARPlaneAnchor, planeAnchor.alignment == .vertical else { return }
        let grid = Grid(anchor: planeAnchor)
        self.grids.append(grid)
        node.addChildNode(grid)
    }
    
    func renderer(_ renderer: SCNSceneRenderer, didUpdate node: SCNNode, for anchor: ARAnchor) {
        guard let planeAnchor = anchor as? ARPlaneAnchor, planeAnchor.alignment == .vertical else { return }
        let grid = self.grids.filter { grid in
            return grid.anchor.identifier == planeAnchor.identifier
            }.first
        
        guard let foundGrid = grid else {
            return
        }
        
        foundGrid.update(anchor: planeAnchor)
    }
    
    @objc func tapped(gesture: UITapGestureRecognizer) {
        // Get 2D position of touch event on screen
        let touchPosition = gesture.location(in: sceneView)
        
        // Translate those 2D points to 3D points using hitTest (existing plane)
        let hitTestResults = sceneView.hitTest(touchPosition, types: .existingPlaneUsingExtent)
        
        // Get hitTest results and ensure that the hitTest corresponds to a grid that has been placed on a wall
        guard let hitTest = hitTestResults.first, let anchor = hitTest.anchor as? ARPlaneAnchor, let gridIndex = grids.index(where: { $0.anchor == anchor }) else {
            return
        }
        addPainting(hitTest, grids[gridIndex])
    }
    @objc func handleLongPress(gesture: UILongPressGestureRecognizer) {
        let location = gesture.location(in: sceneView)
        let entity = sceneView.scene.rootNode.childNodes
        
        let hitTestResults = sceneView.hitTest(location, types: .existingPlaneUsingExtent)
        
        // Get hitTest results and ensure that the hitTest corresponds to a grid that has been placed on a wall
        guard let hitTest = hitTestResults.first, let anchor = hitTest.anchor as? ARPlaneAnchor, let gridIndex = grids.index(where: { $0.anchor == anchor }) else {
            return
        }
        
        let positionVec = SCNVector3(hitTest.worldTransform.columns.3.x, hitTest.worldTransform.columns.3.y, hitTest.worldTransform.columns.3.z)
        
        print("The location is ", positionVec.x, " ", positionVec.y)

        for pos in entity
        {
            print("The tap is ", pos.position.x, " ", pos.position.y)
            if abs(positionVec.x - pos.position.x) < 0.2 && abs(positionVec.y - pos.position.y) < 0.2{
            /*if abs(Float(location.x) - pos.position.x) < 10 &&
                abs(Float(location.y) - pos.position.y) < 10 */
                print("DEBUG")
                let alert = UIAlertController(title: "Congratulations", message: "This sticker is added to your collection \nWould you like to share it with your friends?\nCreated by: Dias on 07.05.2022 ", preferredStyle: .alert)
                if let imageOk = UIImage(named: "mona-lisa"){
                    alert.addImage(image: imageOk)
                }
                alert.addAction(UIAlertAction(title: NSLocalizedString("Share", comment: "Sharing with people"), style: .default, handler: shareImageAction))
                alert.addAction(UIAlertAction(title: NSLocalizedString("Dissmiss", comment: "Default action"), style: .default, handler: { _ in
                    NSLog("The \"OK\" alert occured.")
                    }))
                self.present(alert, animated: true, completion: nil)
            }
        }
    }
    
    func shareImageAction(alert: UIAlertAction!) {
        let image = UIImage(named: "mona-lisa")
                
                // set up activity view controller
        let imageToShare = [ image! ]
        let activityViewController = UIActivityViewController(activityItems: imageToShare, applicationActivities: nil)
        activityViewController.popoverPresentationController?.sourceView = self.view // so that iPads won't crash
                
        // exclude some activity types from the list (optional)
        activityViewController.excludedActivityTypes = [ UIActivity.ActivityType.airDrop, UIActivity.ActivityType.postToFacebook ]
                
        // present the view controller
        self.present(activityViewController, animated: true, completion: nil)
    }
    
    func enableNotification() {
        
    }
    
    func addPainting(_ hitResult: ARHitTestResult, _ grid: Grid) {
        // 1.
        let planeGeometry = SCNPlane(width: 0.4, height: 0.35)
        let material = SCNMaterial()
        material.diffuse.contents = UIImage(named: "mona-lisa")
        planeGeometry.materials = [material]
        
        // 2.
        let paintingNode = SCNNode(geometry: planeGeometry)
        paintingNode.transform = SCNMatrix4(hitResult.anchor!.transform)
        paintingNode.eulerAngles = SCNVector3(paintingNode.eulerAngles.x + (-Float.pi / 2), paintingNode.eulerAngles.y, paintingNode.eulerAngles.z)
        paintingNode.position = SCNVector3(hitResult.worldTransform.columns.3.x, hitResult.worldTransform.columns.3.y, hitResult.worldTransform.columns.3.z)
        
        sceneView.scene.rootNode.addChildNode(paintingNode)
        grid.removeFromParentNode()
    }
}

extension UIAlertController {
    func addImage(image: UIImage)
    {
        let maxSize = CGSize(width: 245, height: 300)
        let imgSize = image.size
        
        var ratio: CGFloat!
        if (imgSize.width > imgSize.height)
        {
            ratio = maxSize.width / imgSize.width
        } else {
            ratio = maxSize.height / imgSize.height
        }
        
        let scaledSize = CGSize(width: imgSize.width * ratio, height: imgSize.height * ratio)
        
        let resizedImage = image.imageWithSize(scaledSize)
        
        let imgAction = UIAlertAction(title:"", style: .default, handler: nil)
        imgAction.isEnabled = false
        imgAction.setValue(resizedImage.withRenderingMode(.alwaysOriginal), forKey: "image")
        self.addAction(imgAction)
    }
}

extension UIImage {
    func imageWithSize(_ size:CGSize) -> UIImage {
        var scaledImageRect = CGRect.zero
        
        let aspectWidth:CGFloat = size.width / self.size.width
        let aspectHeight:CGFloat = size.height / self.size.height
        let aspectRatio:CGFloat = min(aspectWidth, aspectHeight)
        
        scaledImageRect.size.width = self.size.width * aspectRatio
        scaledImageRect.size.height = self.size.height * aspectRatio
        scaledImageRect.origin.x = (size.width - scaledImageRect.size.width) / 2.0
        scaledImageRect.origin.y = (size.height - scaledImageRect.size.height) / 2.0
        
        UIGraphicsBeginImageContextWithOptions(size, false, 0)
        
        self.draw(in: scaledImageRect)
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return scaledImage!
    }
}
