namespace BugMachine.Current;

// SVÅRIGHET: Medel
// TIPS: Inorder-traversering: Vänster → Root → Höger. Är ordningen korrekt i koden?
// Hitta och fixa buggen/buggarna i denna klass.

public class BinaryTree
{
    public class Node
    {
        public int Value;
        public Node? Left, Right;
        public Node(int v) { Value = v; }
    }

    public Node? Root;

    public void Insert(int value)
    {
        Root = Insert(Root, value);
    }

    private Node Insert(Node? node, int value)
    {
        if (node == null) return new Node(value);
        if (value < node.Value) node.Left = Insert(node.Left, value);
        else if (value > node.Value) node.Right = Insert(node.Right, value);
        return node;
    }

    /// <summary>Inorder-traversering (ska ge sorterade värden för ett BST).</summary>
    public List<int> InorderTraversal()
    {
        var result = new List<int>();
        InorderTraversal(Root, result);
        return result;
    }

    private void InorderTraversal(Node? node, List<int> result)
    {
        if (node == null) return;
        InorderTraversal(node.Right, result);
        result.Add(node.Value);
        InorderTraversal(node.Left, result);
    }

    /// <summary>Preorder-traversering (Root → Vänster → Höger).</summary>
    public List<int> PreorderTraversal()
    {
        var result = new List<int>();
        PreorderTraversal(Root, result);
        return result;
    }

    private void PreorderTraversal(Node? node, List<int> result)
    {
        if (node == null) return;
        result.Add(node.Value);
        PreorderTraversal(node.Left, result);
        PreorderTraversal(node.Right, result);
    }
}
